"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Title from "@/components/common/module/Title";

const SearchResult = ({ isHeader }: { isHeader: boolean }) => {
  const router = useRouter();

  return (
    <>
      {isHeader && (
        <div
          className={`absolute top-8 left-0 w-full z-10 ease-out duration-75`}
        >
          search result
        </div>
      )}
      {!isHeader && (
        <div
          className={`flex flex-col items-start gap-12 w-full z-0 ease-out duration-75`}
        >
          <div>
            <Title size={`h1`} text={`Playlists result`} />
          </div>
          <div>
            <Title size={`h1`} text={`Categories result`} />
          </div>
          <div>
            <Title size={`h1`} text={`Users result`} />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;
