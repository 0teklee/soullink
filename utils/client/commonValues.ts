import { PlayerListItem } from "@/types/common/playerTypes";
import { PlaylistType } from "@/types/common/PlaylistType";

export const fakePlaylistSongsData: PlayerListItem[] = [
  {
    id: "first_list_1",
    artist: "Sade",
    title: "Smooth Operator",
    url: "https://www.youtube.com/watch?v=4TYv2PhG89A",
    playedCount: 10,
    likedCount: 20,
  },
  {
    id: "first_list_2",
    artist: "Utata Hikaru",
    title: "In My Room",
    url: "https://soundcloud.com/gum_mp3/in-my-room-utada-hikaru-db-garage-mix?si=7329048ff1f8437cb3f775d34b745e38&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    playedCount: 10,
    likedCount: 2,
  },
];

export const fakeFirstPlaylistData: PlaylistType = {
  id: "first_list",
  title: "First List",
  description: "This is the first list local test data",
  coverImage:
    "https://res.cloudinary.com/dolziw8fv/image/upload/v1674568370/mz2z5khhrctswpwzofnb.png",
  songs: fakePlaylistSongsData,
  author: "admin",
  createdAt: "2021-08-01T00:00:00.000Z",
  updatedAt: "2021-08-01T00:00:00.000Z",
};

export const fakeSecondPlaylistData: PlaylistType = {
  id: "second_list",
  title: "Second Test",
  description: "This is the second list local test data",
  coverImage:
    "https://res.cloudinary.com/dolziw8fv/image/upload/v1680175878/e9u4xoelipawp2wbxpyd.jpg",
  songs: fakePlaylistSongsData,
  author: "admin2",
  createdAt: "2021-08-01T00:00:00.000Z",
  updatedAt: "2021-08-01T00:00:00.000Z",
};

export const fakePlayLists: PlaylistType[] = [
  fakeFirstPlaylistData,
  fakeSecondPlaylistData,
];

export const breakpoints = {
  mobile: 400,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  desktopL: 1440,
};
