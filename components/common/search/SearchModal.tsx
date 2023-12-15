import React from "react";
import Search from "@/components/common/search/Search";

const SearchModal = () => {
  return (
    <div className={`w-96 xs:w-full`}>
      <Search isHeader={true} isCategory={false} />
    </div>
  );
};

export default SearchModal;
