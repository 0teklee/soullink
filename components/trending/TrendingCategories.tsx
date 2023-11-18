"use client";

import React, { useEffect, useState } from "react";
import Title from "@/components/common/module/Title";
import { useQueries } from "react-query";
import {
  DAYS_FILTER,
  DAYS_FILTER_ARR,
  QUERY_CACHE_TIME,
  QUERY_STALE_TIME,
} from "@/libs/utils/client/commonValues";
import {
  getFilteredCategoriesPlaylists,
  getTrendingCategoriesPlaylists,
} from "@/libs/utils/client/fetchers";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";
import FiltersDropdown from "@/components/common/playlist/module/FiltersDropdown";
import FiltersList from "@/components/common/playlist/module/FiltersList";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlaylistType } from "@/libs/types/song&playlistType";

const TrendingCategories = ({
  initData,
}: {
  initData: {
    recentMostPlayedCategoryPlaylist: PlaylistType[];
    categories: string[];
  };
}) => {
  const [period, setPeriod] = useState<DAYS_FILTER>(DAYS_FILTER.ALL_TIME);
  const [categoryFilterList, setCategoryFilterList] = useState<string[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    string[]
  >([]);
  const [isSearchOn, setIsSearchOn] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [trendingCategoriesQuery, categoriesFilterQuery] = useQueries([
    {
      queryKey: ["trendingCategories", period],
      queryFn: () => getTrendingCategoriesPlaylists(`${period}`),
      enabled: selectedCategoryFilter.length === 0,
      initialData: initData,
      cacheTime: QUERY_CACHE_TIME,
      staleTime: QUERY_STALE_TIME,
    },
    {
      queryKey: ["filteredCategories", period],
      queryFn: () =>
        getFilteredCategoriesPlaylists(`${period}`, selectedCategoryFilter),
      enabled: selectedCategoryFilter.length > 0,
      cacheTime: QUERY_CACHE_TIME,
      staleTime: QUERY_STALE_TIME,
    },
  ]);

  const { data: trendingData, refetch: trendingRefetch } =
    trendingCategoriesQuery;
  const { data: filteredCategoriesData, refetch: filterRefetch } =
    categoriesFilterQuery;

  const isCategoryData =
    selectedCategoryFilter.length > 0 &&
    !!filteredCategoriesData &&
    !!filteredCategoriesData?.filteredCategoriesList &&
    filteredCategoriesData.filteredCategoriesList.length > 0;

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

  useEffect(() => {
    if (trendingData?.categories) {
      setCategoryFilterList(trendingData.categories);
    }
  }, [trendingData]);

  useEffect(() => {
    if (selectedCategoryFilter.length === 0) {
      trendingRefetch();
    } else {
      filterRefetch();
    }
  }, [period, selectedCategoryFilter]);

  return (
    <section className={`flex flex-col gap-3 w-full`}>
      <Title text={`Trending Categories`} size={`h1`} />
      <div className={`flex flex-col gap-2`}>
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
        <PlaylistListContainer
          playlists={
            isCategoryData
              ? filteredCategoriesData.filteredCategoriesList
              : trendingData?.recentMostPlayedCategoryPlaylist
          }
          isLarge={true}
          isIndex={true}
        />
      </div>
    </section>
  );
};

export default TrendingCategories;
