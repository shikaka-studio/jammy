export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  album_art_url: string;
  duration_ms: number;
  spotify_id: string;
  spotify_uri: string;
}

export interface QueueSong extends Song {
  likes: number;
  dislikes: number;
  addedBy: string;
}

export interface SearchResult extends Song {}

export interface PlayerState {
  currentTime: number;
  isPlaying: boolean;
  volume: number;
}

export interface RoomUser {
  id: string;
  email: string;
  product: string;
  created_at: string;
  spotify_id: string;
  updated_at: string;
  access_token: string;
  display_name: string;
  refresh_token: string;
  token_expires_at: string | null;
  profile_image_url?: string;
}

export interface RoomMember {
  id: string;
  spotify_id: string;
  display_name: string;
  profile_image_url?: string;
}

export interface Room {
  id: string;
  name: string;
  code: string;
  host_id: string;
  is_active: boolean;
  current_track_uri?: string | null;
  current_position_ms?: number;
  current_song_start?: string | null;
  paused_position_ms?: number | null;
  created_at: string;
  updated_at: string;
  description?: string | null;
  tags?: string[] | null;
  cover_image_url?: string | null;
  members?: RoomMember[];
}

export type RoomFilterType = 'all' | 'popular' | 'recent' | 'tag';

export interface RoomFilter {
  type: RoomFilterType;
  value?: string;
}

export interface CreateRoomFormData {
  name: string;
  tags: string[];
  description: string;
  coverImageUrl: string;
}

export interface CreateRoomRequest {
  name: string;
  host_spotify_id: string;
  description: string;
  cover_image_url: string;
  tags: string[];
}

export interface UploadImageResponse {
  url: string;
}

export interface JoinRoomRequest {
  code: string;
  user_spotify_id: string;
}

export interface AddSongRequest {
  code: string;
  spotify_track_id: string;
  title: string;
  artist: string;
  album: string;
  album_art_url: string;
  spotify_uri: string;
  duration_ms: number;
  user_spotify_id: string;
}

export interface LeaveRoomParams {
  user_spotify_id: string;
}

export interface CloseRoomParams {
  host_spotify_id: string;
}

export interface HistorySong extends Song {
  playedAt: Date;
  addedBy: string;
}

export interface RoomSession {
  id: string;
  date: Date;
  songs: HistorySong[];
}

export type QueueTabType = 'queue' | 'recent' | 'chat';

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
}
