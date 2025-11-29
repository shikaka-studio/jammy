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

export interface Room {
  id: string;
  name: string;
  coverImage: string;
  currentSong: {
    artist: string;
    title: string;
  };
  usersCount: number;
  tags: string[];
  createdAt: Date;
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

export interface HistorySong extends Song {
  playedAt: Date;
  addedBy: string;
}

export interface RoomSession {
  id: string;
  date: Date;
  songs: HistorySong[];
}

export type QueueTabType = 'queue' | 'recent';

