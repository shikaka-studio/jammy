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

export interface RoomMember {
  spotify_id: string;
  display_name: string;
  profile_image_url?: string;
}

export interface Room {
  room_code: string;
  name: string;
  host: RoomMember;
  members: RoomMember[];
  created_at: string;
  coverImage?: string;
  currentSong?: {
    artist: string;
    title: string;
  };
  tags?: string[];
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

