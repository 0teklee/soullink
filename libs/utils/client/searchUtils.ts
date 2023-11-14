import {
  SEARCH_ORDER_BY_ARRAY,
  SEARCH_TYPE,
  SEARCH_TYPE_ARRAY,
} from "@/libs/utils/client/searchValue";
import { DAYS_FILTER_ARR } from "@/libs/utils/client/commonValues";
import {
  SearchAllData,
  SearchResultQueriesData,
} from "@/libs/utils/client/searchType";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";

export const getOrderByOptions = (type: SEARCH_TYPE | "") => {
  if (
    type === SEARCH_TYPE.ALL ||
    type === SEARCH_TYPE.PLAYLIST ||
    type === SEARCH_TYPE.CATEGORY_PLAYLIST ||
    type === SEARCH_TYPE.MOOD_PLAYLIST
  ) {
    return SEARCH_ORDER_BY_ARRAY.filter(
      (item) =>
        item.value.includes("RECENT,") ||
        item.value.includes("PLAY,") ||
        item.value.includes("LIKE,"),
    );
  }

  return [];
};

export const getRecentOptions = (type: SEARCH_TYPE | "") => {
  if (
    type === SEARCH_TYPE.ALL ||
    type === SEARCH_TYPE.PLAYLIST ||
    type === SEARCH_TYPE.CATEGORY_PLAYLIST ||
    type === SEARCH_TYPE.MOOD_PLAYLIST
  ) {
    return DAYS_FILTER_ARR;
  }

  return [];
};

export const formatSearchResultType = (type: SEARCH_TYPE | "") => {
  const isAll = type === SEARCH_TYPE.ALL;
  const isPlaylist = isAll || type === SEARCH_TYPE.PLAYLIST;
  const isCategory = isAll || type === SEARCH_TYPE.CATEGORIES;
  const isUser = isAll || type === SEARCH_TYPE.USER;

  const isCategoryPlaylist = type === SEARCH_TYPE.CATEGORY_PLAYLIST;
  const isMoodPlaylist = type === SEARCH_TYPE.MOOD_PLAYLIST;

  return {
    isAll,
    isPlaylist,
    isCategory,
    isUser,
    isCategoryPlaylist,
    isMoodPlaylist,
  };
};

export const formatSearchResultDataProps = (
  type: SEARCH_TYPE | "",
  data: SearchResultQueriesData,
) => {
  const {
    isAll,
    isPlaylist,
    isCategory,
    isUser,
    isMoodPlaylist,
    isCategoryPlaylist,
  } = formatSearchResultType(type);

  if (isAll) {
    return data.searchAllQuery;
  }
  if (isPlaylist) {
    return data.searchPlaylistQuery;
  }
  if (isCategory) {
    return data.searchCategoryQuery;
  }
  if (isUser) {
    return data.searchUserQuery;
  }

  if (isCategoryPlaylist) {
    return data.searchCategoryPlaylistQuery;
  }
  if (isMoodPlaylist) {
    return data.searchMoodPlaylistQuery;
  }
  return null;
};

export const formatSearchTypeFilter = (isGenre?: boolean) => {
  if (isGenre) {
    return SEARCH_TYPE_ARRAY.filter(
      (item) =>
        item.value === SEARCH_TYPE.CATEGORIES ||
        item.value === SEARCH_TYPE.CATEGORY_PLAYLIST,
    );
  }

  return SEARCH_TYPE_ARRAY.filter(
    (item) => item.value !== SEARCH_TYPE.CATEGORY_PLAYLIST,
  );
};

export const getIsResultMoreThanOne = (
  type: "playlists" | "users" | "categories",
  formattedData:
    | string[]
    | PlaylistType[]
    | SearchAllData
    | { id: string; nickname: string; profilePic?: string | undefined }[]
    | undefined,
) => {
  if (!formattedData) {
    return false;
  }

  if ("result" in formattedData) {
    return "result" in formattedData && formattedData?.result[type].length > 0;
  }

  return formattedData.length > 0;
};
