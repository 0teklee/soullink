import React, { useEffect } from "react";
import { useQueries } from "react-query";
import {
  getSearchAll,
  getSearchCategories,
  getSearchCategoryPlaylists,
  getSearchMoodPlaylists,
  getSearchPlaylists,
  getSearchUsers,
} from "@/libs/utils/client/fetchers";
import { SEARCH_ORDER_BY, SEARCH_TYPE } from "@/libs/utils/client/searchValue";
import { DAYS_FILTER } from "@/libs/utils/client/commonValues";
import { SearchResultQueriesData } from "@/libs/types/searchType";

const UseSearchQueries = (
  keyword: string,
  recentFilter: DAYS_FILTER,
  orderFilter: SEARCH_ORDER_BY | "",
  searchType: SEARCH_TYPE | "",
  isFetching: boolean,
  moodFilter: string,
): SearchResultQueriesData => {
  const [
    searchAllQuery,
    searchPlaylistQuery,
    searchCategoryQuery,
    searchUserQuery,
    searchMoodPlaylistQuery,
    searchCategoryPlaylistQuery,
  ] = useQueries([
    {
      queryKey: ["search_all", keyword, recentFilter, orderFilter],
      queryFn: () => {
        return getSearchAll(keyword, recentFilter, orderFilter);
      },
      enabled: !!keyword && SEARCH_TYPE.ALL === searchType && isFetching,
    },
    {
      queryKey: ["search_playlist", keyword, recentFilter, orderFilter],
      queryFn: () => {
        return getSearchPlaylists(keyword, recentFilter, orderFilter);
      },
      enabled: !!keyword && SEARCH_TYPE.PLAYLIST === searchType && isFetching,
    },
    {
      queryKey: ["search_category", keyword],
      queryFn: () => {
        return getSearchCategories(keyword);
      },
      enabled: !!keyword && SEARCH_TYPE.CATEGORIES === searchType && isFetching,
    },
    {
      queryKey: ["search_user", keyword],
      queryFn: () => {
        return getSearchUsers(keyword);
      },
      enabled: !!keyword && SEARCH_TYPE.USER === searchType && isFetching,
    },
    {
      queryKey: [
        "search_mood_playlist",
        keyword,
        recentFilter,
        orderFilter,
        moodFilter,
      ],
      queryFn: () => {
        return getSearchMoodPlaylists(
          keyword,
          moodFilter,
          recentFilter,
          orderFilter,
        );
      },
      enabled: SEARCH_TYPE.MOOD_PLAYLIST === searchType && isFetching,
    },
    {
      queryKey: [
        "search_category_playlist",
        keyword,
        recentFilter,
        orderFilter,
      ],
      queryFn: () => {
        return getSearchCategoryPlaylists(keyword, recentFilter, orderFilter);
      },
      enabled: SEARCH_TYPE.CATEGORY_PLAYLIST === searchType && isFetching,
    },
  ]);

  useEffect(() => {
    searchMoodPlaylistQuery.refetch();
  }, [moodFilter]);

  return {
    searchAllQuery,
    searchPlaylistQuery,
    searchCategoryQuery,
    searchUserQuery,
    searchMoodPlaylistQuery,
    searchCategoryPlaylistQuery,
  };
};

export default UseSearchQueries;
