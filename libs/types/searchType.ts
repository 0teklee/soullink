import { PlaylistType } from "@/libs/types/song&playlistType";
import { UserType } from "@/libs/types/userType";
import { UseQueryResult } from "@tanstack/react-query";

export interface SearchAllData {
  result: {
    playlists: PlaylistType[];
    users: UserType[];
    categories: { name: string }[];
  };
}

export type SearchResultType =
  | PlaylistType[]
  | UserType[]
  | { name: string }[]
  | SearchAllData;

export interface SearchResultQueriesData {
  searchAllQuery: UseQueryResult<SearchAllData>;
  searchPlaylistQuery: UseQueryResult<PlaylistType[]>;
  searchCategoryQuery: UseQueryResult<string[]>;
  searchUserQuery: UseQueryResult<
    { id: string; nickname: string; profilePic?: string }[]
  >;
  searchMoodPlaylistQuery: UseQueryResult<PlaylistType[]>;
  searchCategoryPlaylistQuery: UseQueryResult<PlaylistType[]>;
}

export interface SearchResultFormattedData {
  all?: UseQueryResult<SearchAllData>;
  playlist?: UseQueryResult<PlaylistType[]>;
  users?: UseQueryResult<UserType[]>;
  categories?: UseQueryResult<{ name: string }[]>;
}
