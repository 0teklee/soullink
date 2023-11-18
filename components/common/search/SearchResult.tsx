"use client";

import React, { useMemo } from "react";
import Title from "@/components/common/module/Title";
import { SEARCH_TYPE } from "@/libs/utils/client/searchValue";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { UserType } from "@/libs/types/userType";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";
import {
  formatSearchResultDataProps,
  formatSearchResultType,
  getIsResultMoreThanOne,
} from "@/libs/utils/client/searchUtils";
import { SearchResultQueriesData } from "@/libs/types/searchType";
import CategoriesList from "@/components/common/category/list/CategoriesList";
import UserList from "@/components/common/user/list/UserList";
import Image from "next/image";

const SearchResult = ({
  data,
  isHeader,
  searchType,
}: {
  isHeader: boolean;
  searchType: SEARCH_TYPE;
  data: SearchResultQueriesData;
}) => {
  const {
    isAll,
    isUser,
    isPlaylist,
    isCategory,
    isCategoryPlaylist,
    isMoodPlaylist,
  } = useMemo(() => formatSearchResultType(searchType), [searchType]);

  const propsData = useMemo(
    () => formatSearchResultDataProps(searchType, data),
    [data, searchType],
  );

  const { data: formattedData, isLoading } = propsData || {};

  const isAllResult = !!formattedData && "result" in formattedData;
  const isNotAllResult = !!formattedData && !("result" in formattedData);

  const isPlaylistResult =
    (isAll || isPlaylist || isCategoryPlaylist || isMoodPlaylist) &&
    (isAllResult || isNotAllResult);

  const isCategoryResult =
    (isAll || isCategory) && (isAllResult || isNotAllResult);

  const isUserResult = (isAll || isUser) && (isAllResult || isNotAllResult);

  const isUserMoreThanOne = getIsResultMoreThanOne("users", formattedData);

  const isPlaylistMoreThanOne = getIsResultMoreThanOne(
    "playlists",
    formattedData,
  );

  const isCategoryMoreThanOne = getIsResultMoreThanOne(
    "categories",
    formattedData,
  );

  const searchPlaylistData = isAllResult
    ? formattedData?.result?.playlists
    : (formattedData as PlaylistType[]);

  const searchCategoryData = isAllResult
    ? formattedData?.result?.categories
    : (formattedData as string[]);

  const searchUserData = isAllResult
    ? formattedData?.result?.users
    : (formattedData as UserType[]);

  return (
    <div
      className={`${
        isHeader ? "absolute top-8 left-0 z-10" : ""
      } flex flex-col items-start gap-16 w-full z-0 ease-out duration-75`}
    >
      {(isAllResult || isPlaylistResult) && isPlaylistMoreThanOne && (
        <div className={`flex flex-col items-start gap-5 w-full`}>
          <Title size={`h1`} text={`Playlists result`} />
          <div className={`flex items-start gap-2 text-md text-gray-500`}>
            <p>{searchPlaylistData ? searchPlaylistData.length : 0}</p>
            <p> results</p>
          </div>
          <PlaylistListContainer
            playlists={searchPlaylistData}
            isLarge={false}
          />
        </div>
      )}
      {(isAllResult || isPlaylistResult) && !isPlaylistMoreThanOne && (
        <div className={`flex flex-col items-start gap-5`}>
          <Title size={`h1`} text={`Playlists result`} />
          <div className={`flex flex-col items-start gap-5`}>
            <Title size={`h2`} text={`No result`} />
          </div>
        </div>
      )}
      {isCategoryResult && isCategoryMoreThanOne && (
        <div className={`flex flex-col items-start gap-5 w-full`}>
          <Title size={`h1`} text={`Categories result`} />
          <div className={`flex items-start gap-2 text-md text-gray-500`}>
            <p>{searchCategoryData ? searchCategoryData.length : 0}</p>
            <p> results</p>
          </div>
          <CategoriesList categories={searchCategoryData} />
        </div>
      )}
      {isCategoryResult && !isCategoryMoreThanOne && (
        <div className={`flex flex-col items-start gap-5`}>
          <Title size={`h1`} text={`Categories result`} />
          <div className={`flex flex-col items-start gap-5`}>
            <Title size={`h2`} text={`No result`} />
          </div>
        </div>
      )}
      {data && isUserResult && isUserMoreThanOne && (
        <div className={`flex flex-col items-start gap-5 w-full`}>
          <Title size={`h1`} text={`Users result`} />
          <div className={`flex items-start gap-2 text-md text-gray-500`}>
            <p>{searchUserData ? searchUserData.length : 0}</p>
            <p> results</p>
          </div>
          <UserList users={searchUserData} />
        </div>
      )}
      {data && isUserResult && !isUserMoreThanOne && (
        <div className={`flex flex-col items-start gap-5`}>
          <Title size={`h1`} text={`Users result`} />
          <div className={`flex flex-col items-start gap-5`}>
            <Title size={`h2`} text={`No result`} />
          </div>
        </div>
      )}
      {isLoading && (
        <div className={`flex items-center justify-center w-full h-full`}>
          <Image
            src={`/image/common/loading_spinner.svg`}
            alt={`loading`}
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResult;
