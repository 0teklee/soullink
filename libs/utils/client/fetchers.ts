import {
  PlaylistLikeType,
  PlaylistType,
  SongLikeType,
} from "@/types/common/Song&PlaylistType";

export const getSinglePlaylist = async (id: string): Promise<PlaylistType> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/${id}`,
  );
  const resData: Promise<PlaylistType> = await res
    .json()
    .then((data) => data.data);
  return resData;
};

export const getPlaylistsPaths = async (): Promise<string[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/paths`,
  );
  const data = await res.json();
  const paths = data.playlistsPaths;
  return paths;
};

export const postPlaylistLike = async (request: PlaylistLikeType) => {
  const { playlistId } = request;
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/${playlistId}/like`,
    {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();
  return data;
};

export const postSongLike = async (request: SongLikeType) => {
  const { songId } = request;
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/song/${songId}/like`,
    {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();
  return data;
};
