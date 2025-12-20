import type { Song } from '@/types/room';
import type { PlaybackState } from '@/types/websocket';

/**
 * Converts a WebSocket track object to Song format
 */
export const convertTrackToSong = (track: PlaybackState['current_track']): Song | null => {
  if (!track) return null;
  return {
    id: track.id,
    title: track.title,
    artist: track.artist,
    album: track.album,
    album_art_url: track.album_art_url,
    duration_ms: track.duration_ms,
    spotify_id: track.spotify_id,
    spotify_uri: track.spotify_uri,
  };
};

/**
 * Calculates the current playback position in milliseconds
 * @param isPlaying - Whether the track is currently playing
 * @param playbackStartedAt - ISO timestamp when playback started
 * @param basePositionMs - Base position in ms (used when paused)
 * @param durationMs - Total duration of the track in milliseconds
 * @returns Current position in milliseconds, capped at duration
 */
export const calculateCurrentPosition = (
  isPlaying: boolean,
  playbackStartedAt: string | null,
  basePositionMs: number,
  durationMs?: number
): number => {
  if (!isPlaying || !playbackStartedAt) {
    return basePositionMs;
  }

  const startTime = new Date(playbackStartedAt).getTime();
  const now = Date.now();
  const elapsedMs = now - startTime;

  // Cap at duration if provided
  if (durationMs !== undefined) {
    return Math.min(elapsedMs, durationMs);
  }

  return elapsedMs;
};
