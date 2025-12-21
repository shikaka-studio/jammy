import { useState, useEffect, useCallback } from 'react';
import { playbackService } from '@/services/playback';
import { convertTrackToSong, calculateCurrentPosition } from '@/utils/playback';
import type { Song, PlayerState } from '@/types/room';
import type { PlaybackState } from '@/types/websocket';
import type { SpotifyPlayerContextValue } from '@/types/spotifyPlayer';

interface UsePlaybackSyncOptions {
  roomCode: string | undefined;
  spotifyPlayer: SpotifyPlayerContextValue;
  onError?: (error: string | null) => void;
}

interface UsePlaybackSyncReturn {
  currentSong: Song | null;
  playerState: PlayerState;
  handlePlaybackUpdate: (playbackState: PlaybackState) => void;
  handleTogglePlay: () => void;
  handleSeek: (time: number) => void;
}

const usePlaybackSync = ({
  roomCode,
  spotifyPlayer,
  onError,
}: UsePlaybackSyncOptions): UsePlaybackSyncReturn => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTime: 0,
    isPlaying: false,
    volume: 0.8,
  });
  const [playbackStartedAt, setPlaybackStartedAt] = useState<string | null>(null);
  const [basePositionMs, setBasePositionMs] = useState(0);

  // Handle playback state updates from WebSocket
  const handlePlaybackUpdate = useCallback(
    (playbackState: PlaybackState) => {
      const song = convertTrackToSong(playbackState.current_track);
      setCurrentSong(song);
      setPlaybackStartedAt(playbackState.playback_started_at);
      setBasePositionMs(playbackState.position_ms);

      setPlayerState((prev) => ({
        ...prev,
        currentTime: Math.floor(playbackState.position_ms / 1000),
        isPlaying: playbackState.is_playing,
      }));

      // Control Spotify player based on WebSocket updates
      if (!spotifyPlayer.isReady || !song) {
        return;
      }

      if (playbackState.is_playing) {
        spotifyPlayer.play(song.spotify_uri, playbackState.position_ms);
        return;
      }

      spotifyPlayer.pause();
    },
    [spotifyPlayer]
  );

  // Update current time every second when playing
  useEffect(() => {
    if (!playerState.isPlaying) return;

    const interval = setInterval(() => {
      const currentPositionMs = calculateCurrentPosition(
        playerState.isPlaying,
        playbackStartedAt,
        basePositionMs,
        currentSong?.duration_ms
      );
      setPlayerState((prev) => ({
        ...prev,
        currentTime: Math.floor(currentPositionMs / 1000),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [playerState.isPlaying, playbackStartedAt, basePositionMs, currentSong]);

  // Fetch initial playback state when room loads
  useEffect(() => {
    const fetchInitialPlayback = async () => {
      if (!roomCode) return;

      try {
        const playbackState = await playbackService.getPlaybackState(roomCode);
        handlePlaybackUpdate(playbackState);
      } catch (playbackErr) {
        console.log('No active playback state');
        // It's okay if there's no playback state yet
      }
    };

    fetchInitialPlayback();
  }, [roomCode, handlePlaybackUpdate]);

  const handleTogglePlay = useCallback(() => {
    if (playerState.isPlaying) {
      spotifyPlayer.pause();
      setPlayerState((prev) => ({ ...prev, isPlaying: false }));
      return;
    }

    // Resume playback at current position
    if (currentSong) {
      spotifyPlayer.play(currentSong.spotify_uri, playerState.currentTime * 1000);
    }
    setPlayerState((prev) => ({ ...prev, isPlaying: true }));
  }, [playerState.isPlaying, playerState.currentTime, currentSong, spotifyPlayer]);

  const handleSeek = useCallback(
    (time: number) => {
      spotifyPlayer.seek(time * 1000);
      setPlayerState((prev) => ({ ...prev, currentTime: time }));
    },
    [spotifyPlayer]
  );

  return {
    currentSong,
    playerState,
    handlePlaybackUpdate,
    handleTogglePlay,
    handleSeek,
  };
};

export default usePlaybackSync;
