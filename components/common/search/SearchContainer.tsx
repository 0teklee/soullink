"use client";

import React from "react";
import SearchInput from "@/components/common/search/SearchInput";
import SearchResult from "@/components/common/search/SearchResult";

const SearchContainer = ({ isHeader }: { isHeader: boolean }) => {
  const sample = null;
  return (
    <div className={`flex flex-col gap-3`}>
      <SearchInput isHeader={isHeader} />
      <SearchResult isHeader={isHeader} />
    </div>
  );
};

export default SearchContainer;
