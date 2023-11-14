"use client";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
  DAYS_FILTER,
  DAYS_FILTER_ARR,
  MOOD_TYPE_ARR,
} from "@/libs/utils/client/commonValues";
import {
  SEARCH_ORDER_BY,
  SEARCH_ORDER_BY_ARRAY,
  SEARCH_TYPE,
} from "@/libs/utils/client/searchValue";
import FiltersDropdown from "@/components/common/playlist/module/FiltersDropdown";
import {
  formatSearchTypeFilter,
  getOrderByOptions,
  getRecentOptions,
} from "@/libs/utils/client/searchUtils";
import useTimer from "@/libs/utils/hooks/useTimer";
import useSearchQueries from "@/libs/utils/hooks/useSearchQueries";
import SearchResult from "@/components/common/search/SearchResult";

const Search = ({
  isHeader,
  isCategory,
  params,
}: {
  isHeader: boolean;
  isCategory?: boolean;
  params?: string | null;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [searchType, setSearchType] = useState<SEARCH_TYPE>(SEARCH_TYPE.ALL);
  const [recentFilter, setRecentFilter] = useState(DAYS_FILTER.ALL_TIME);
  const [orderFilter, setOrderFilter] = useState<SEARCH_ORDER_BY | "">("");
  const [moodFilter, setMoodFilter] = useState<string>("");
  const [isOrderByAvailable, setIsOrderByAvailable] = useState(false);
  const [isRecentAvailable, setIsRecentAvailable] = useState(false);
  const [isMoodAvailable, setIsMoodAvailable] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const isPage = !isHeader;

  const searchQueriesData = useSearchQueries(
    keyword,
    recentFilter,
    orderFilter,
    searchType,
    isFetching,
    moodFilter,
  );
  const FILTERED_SEARCH_TYPE_ARRAY = formatSearchTypeFilter(isCategory);

  const { timer, resetTimer } = useTimer(() => {
    setIsFetching(true);
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    setKeyword(e.target.value);

    resetTimer(timer);
    setIsFetching(false);
  };

  useEffect(() => {
    if (isCategory) {
      setSearchType(SEARCH_TYPE.CATEGORY_PLAYLIST);
      setIsFetching(true);
    }

    if (params) {
      setKeyword(params);
    }
  }, []);

  useEffect(() => {
    if (searchType) {
      setIsOrderByAvailable(getOrderByOptions(searchType).length > 0);
      setIsRecentAvailable(getRecentOptions(searchType).length > 0);
      setIsMoodAvailable(searchType === SEARCH_TYPE.MOOD_PLAYLIST);
    }
  }, [searchType]);

  return (
    <div className={`flex flex-col items-start gap-10`}>
      <div className={`flex flex-col gap-2 xs:w-full`}>
        {!isCategory && (
          <div
            className={`relative ${
              isHeader ? "" : "flex items-center gap-3 "
            } xs:w-full`}
          >
            <button
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <MagnifyingGlassIcon
                className={`w-5 h-5 text-gray-700 hover:text-primary`}
              />
            </button>
            <div
              className={`${
                isHeader && isDropdownOpen ? "absolute top-8 left-0" : ""
              } w-full z-10 ease-out duration-75`}
            >
              <input
                value={keyword}
                onChange={handleSearch}
                type={`text`}
                className={`w-full min-w-sm max-w-lg pl-2 pr-3 py-2 text-sm text-gray-700 bg-white rounded border border-gray-300  outline-none
          focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 
           `}
              />
            </div>
          </div>
        )}
        {isPage && (
          <div className={`flex items-center justify-start gap-12`}>
            {!isCategory && (
              <div className={`flex items-center gap-2 xs:flex-wrap`}>
                <p
                  className={`whitespace-nowrap text-sm text-gray-700 font-medium`}
                >
                  Search Type:
                </p>
                <FiltersDropdown
                  filters={FILTERED_SEARCH_TYPE_ARRAY}
                  setSelectedFilter={
                    setSearchType as <SEARCH_TYPE>(
                      val: SEARCH_TYPE | "",
                    ) => void
                  }
                  selectedFilter={
                    FILTERED_SEARCH_TYPE_ARRAY.find(
                      (type) => type.value === searchType,
                    )?.label || "select"
                  }
                />
              </div>
            )}
            {isMoodAvailable && (
              <div
                className={`flex items-center gap-2 xs:flex-col xs:items-start`}
              >
                <p className={`text-sm text-gray-700 font-medium xs:text-xs`}>
                  Mood:
                </p>
                <FiltersDropdown
                  filters={MOOD_TYPE_ARR}
                  setSelectedFilter={
                    setMoodFilter as <MOOD_TYPE>(val: MOOD_TYPE | "") => void
                  }
                  selectedFilter={moodFilter}
                />
              </div>
            )}
            {isOrderByAvailable && (
              <div
                className={`flex items-center gap-2 xs:flex-col xs:items-start`}
              >
                <p className={`text-sm text-gray-700 font-medium xs:text-xs`}>
                  Filter:
                </p>
                <FiltersDropdown
                  filters={getOrderByOptions(searchType)}
                  setSelectedFilter={
                    setOrderFilter as <SEARCH_ORDER_BY>(
                      val: SEARCH_ORDER_BY | "",
                    ) => void
                  }
                  selectedFilter={
                    SEARCH_ORDER_BY_ARRAY.find(
                      (type) => type.value === orderFilter,
                    )?.label || "select filter"
                  }
                />
              </div>
            )}
            {isRecentAvailable && (
              <div
                className={`flex items-center gap-2 xs:flex-col xs:items-start`}
              >
                <p className={`text-sm text-gray-700 font-medium xs:text-xs`}>
                  Created
                </p>
                <FiltersDropdown
                  filters={DAYS_FILTER_ARR}
                  setSelectedFilter={
                    setRecentFilter as <DAYS_FILTER>(val: DAYS_FILTER) => void
                  }
                  selectedFilter={recentFilter as unknown as string}
                  selectedFilterLabel={
                    DAYS_FILTER_ARR.find((item) => item.value === recentFilter)
                      ?.label
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
      <SearchResult
        data={searchQueriesData}
        isHeader={isHeader}
        searchType={searchType}
      />
    </div>
  );
};

export default Search;
