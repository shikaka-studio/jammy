export interface Song {
  id: string;
  name: string;
  artist: string;
  albumCover: string;
  duration: number;
}

export interface QueueSong extends Song {
  likes: number;
  dislikes: number;
  addedBy: string;
}

export interface SearchResult extends Song {
  album: string;
}

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
  profile_image_url?: string;
}

export interface RoomMember {
  id: string;
  room_id: string;
  user_id: string;
  joined_at: string;
  users: RoomUser;
}

export interface RoomHost {
  id?: string;
  spotify_id?: string;
  display_name?: string;
  profile_image_url?: string;
}

export interface RoomData {
  id: string;
  name: string;
  room_code: string;
  host_id: string | null;
  is_active: boolean;
  current_track_uri: string | null;
  current_position_ms: number;
  created_at: string;
  updated_at: string;
  description?: string | null;
  tags?: string[] | null;
  cover_image?: string | null;
  host?: RoomHost | null;
}

export interface Room {
  room: RoomData;
  members: RoomMember[];
}

export interface RoomsResponse {
  rooms: Room[];
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
  coverImage: File | null;
}

export interface CreateRoomRequest {
  name: string;
  host_spotify_id: string;
}

export interface JoinRoomRequest {
  room_code: string;
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

