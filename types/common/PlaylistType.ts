export interface SongType {
  id: string;
  artist: string;
  title: string;
  url: string;
  playedCount: number;
  likedCount: number;
}

export interface PlaylistType {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  songs: SongType[];
  author: string;
  createdAt: string;
  updatedAt: string;
}
