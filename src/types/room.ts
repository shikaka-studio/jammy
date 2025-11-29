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

