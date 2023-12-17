import React, { useEffect, useState } from "react";
import {
  DAYS_FILTER,
  DAYS_FILTER_ARR,
  QUERY_CACHE_TIME,
  QUERY_STALE_TIME,
  RECENT_FILTER,
  RECENT_FILTER_ARR,
} from "@/libs/utils/client/commonValues";
import { useSuspenseQueries } from "@tanstack/react-query";
import {
  getFilteredCategoriesPlaylists,
  getTrendingCategoriesPlaylists,
} from "@/libs/utils/client/fetchers";
import FiltersDropdown from "@/components/common/playlist/module/FiltersDropdown";
import FiltersList from "@/components/common/playlist/module/FiltersList";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";

const TrendingCategoriesList = () => {
  const [period, setPeriod] = useState<DAYS_FILTER>(DAYS_FILTER.ALL_TIME);
  const [categoryFilterList, setCategoryFilterList] = useState<string[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    string[]
  >([]);
  const [isSearchOn, setIsSearchOn] = useState<boolean>(false);
  const [recentPlayedFilter, setRecentPlayedFilter] = useState(
    RECENT_FILTER.RECENT_DESC,
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [trendingCategoriesQuery, categoriesFilterQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["trendingCategories", period, recentPlayedFilter],
        queryFn: () =>
          getTrendingCategoriesPlaylists(period, recentPlayedFilter),
        gcTime: QUERY_CACHE_TIME,
        staleTime: QUERY_STALE_TIME,
      },
      {
        queryKey: ["filteredCategories", period, selectedCategoryFilter],
        queryFn: () =>
          getFilteredCategoriesPlaylists(period, selectedCategoryFilter),
        gcTime: QUERY_CACHE_TIME,
        staleTime: QUERY_STALE_TIME,
      },
    ],
  });

  const { data: trendingData } = trendingCategoriesQuery;
  const { data: filteredCategoriesData } = categoriesFilterQuery;

  const isCategoryData =
    selectedCategoryFilter.length > 0 &&
    !!filteredCategoriesData &&
    !!filteredCategoriesData?.filteredCategoriesList;

  const handleDropdownChange = (val: DAYS_FILTER) => {
    setPeriod(val);
  };

  const handleCategoriesFilter = (val: string) => {
    setSelectedCategoryFilter((prev) => {
      if (prev.includes(val)) {
        return prev.filter((item) => item !== val);
      }
      return [...prev, val];
    });
  };

  const handleRecentPlayedDropdownChange = (val: RECENT_FILTER) => {
    setRecentPlayedFilter(val);
  };

  useEffect(() => {
    if (trendingData?.categories) {
      setCategoryFilterList(trendingData.categories);
    }
  }, [trendingData]);

  return (
    <div className={`flex flex-col gap-2`}>
      <div className={`flex items-center gap-2`}>
        <FiltersDropdown
          filters={DAYS_FILTER_ARR}
          setSelectedFilter={
            handleDropdownChange as <DAYS_FILTER>(val: DAYS_FILTER) => void
          }
          selectedFilter={period as unknown as string}
          selectedFilterLabel={
            DAYS_FILTER_ARR.find((item) => item.value === period)?.label
          }
        />
        <FiltersDropdown
          filters={RECENT_FILTER_ARR}
          setSelectedFilter={
            handleRecentPlayedDropdownChange as <RECENT_FILTER>(
              val: RECENT_FILTER,
            ) => void
          }
          customStyles={`text-xs`}
          selectedFilter={recentPlayedFilter as unknown as string}
          selectedFilterLabel={
            RECENT_FILTER_ARR.find((item) => item.value === recentPlayedFilter)
              ?.label
          }
        />
      </div>
      <div className={`flex flex-wrap items-center gap-2 mb-2`}>
        <p className={`text-sm text-gray-700 font-medium`}>Categories : </p>
        <FiltersList
          filters={categoryFilterList}
          onClick={handleCategoriesFilter}
          selectedFilter={selectedCategoryFilter}
        />
        <button
          onClick={() => {
            setIsSearchOn((prev) => !prev);
          }}
        >
          <MagnifyingGlassIcon
            className={`w-5 h-5 text-md text-gray-500 font-medium `}
          />
        </button>
        {isSearchOn && (
          <input
            className={`min-w-lg p-1 text-sm text-gray-700 rounded-lg bg-white outline-none border border-gray-300 
              focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50
              `}
            type={`text`}
            placeholder={`press enter to search`}
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchKeyword.length > 0) {
                setCategoryFilterList((prev) => {
                  if (prev.includes(searchKeyword)) {
                    return prev.filter((item) => item !== searchKeyword);
                  }
                  return [...prev, searchKeyword];
                });
                setSelectedCategoryFilter((prev) => {
                  if (prev.includes(searchKeyword)) {
                    return prev.filter((item) => item !== searchKeyword);
                  }
                  return [...prev, searchKeyword];
                });
                setSearchKeyword("");
              }
            }}
          />
        )}
      </div>
      <ReactQueryErrorBoundary>
        <PlaylistListContainer
          playlists={
            isCategoryData
              ? filteredCategoriesData.filteredCategoriesList
              : trendingData?.recentMostPlayedCategoryPlaylist
          }
          isLarge={true}
          isIndex={true}
        />
      </ReactQueryErrorBoundary>
    </div>
  );
};

export default TrendingCategoriesList;
