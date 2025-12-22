export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  album_art_url: string;
  duration_ms: number;
  spotify_id: string;
  spotify_uri: string;
}

export interface PlaybackState {
  is_playing: boolean;
  current_track: Track | null;
  position_ms: number;
  playback_started_at: string | null;
}

export interface QueueSongWS {
  id: string;
  title: string;
  artist: string;
  album: string;
  album_art_url: string;
  duration_ms: number;
  spotify_id: string;
  spotify_uri: string;
  added_by: {
    id: string;
    spotify_id: string;
    display_name: string;
    profile_image_url: string;
  };
}

export interface QueueUpdate {
  queue: QueueSongWS[];
  recently_played: QueueSongWS[];
}

export interface MemberEvent {
  user_id: string;
  display_name: string;
  profile_image_url: string;
  connection_count: number;
}

export interface Notification {
  message: string;
  level: 'info' | 'error' | 'warning';
}

export type WebSocketMessage =
  | { type: 'playback_state'; data: PlaybackState }
  | { type: 'queue_update'; data: QueueUpdate }
  | { type: 'member_joined'; data: MemberEvent }
  | { type: 'member_left'; data: MemberEvent }
  | { type: 'notification'; data: Notification };
