"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface FiltersArrObj {
  value: string | number;
  label: string;
}

interface FiltersDropdownProps {
  filters: string[] | FiltersArrObj[];
  setSelectedFilter: <T>(val: T) => void | Dispatch<SetStateAction<T>>;
  selectedFilter?: string;
  selectedFilterLabel?: string;
  customStyles?: string;
}

const FiltersDropdown = ({
  filters,
  setSelectedFilter,
  selectedFilter,
  selectedFilterLabel,
  customStyles,
}: FiltersDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={`relative xs:text-xs`}>
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <div className={`flex items-center gap-2 `}>
          <p
            className={`${
              customStyles || "text-sm font-medium"
            } whitespace-nowrap text-gray-700 xs:text-xs`}
          >
            {selectedFilterLabel || selectedFilter}
          </p>
          {isDropdownOpen ? (
            <ChevronUpIcon className={`w-5 h-5 text-gray-700`} />
          ) : (
            <ChevronDownIcon className={`w-5 h-5 text-gray-700`} />
          )}
        </div>
      </button>
      {isDropdownOpen && (
        <div className={`absolute top-8 left-0  z-20 ease-out duration-75`}>
          <div
            className={`flex flex-col gap-2 w-full bg-white border border-gray-300 rounded-md shadow-lg`}
          >
            {filters.map((filter, index) => (
              <button
                onClick={() => {
                  setSelectedFilter(
                    typeof filter !== "string" && "value" in filter
                      ? filter.value
                      : filter,
                  );
                  setIsDropdownOpen(false);
                }}
                key={`filter_${filter}_${index}`}
                className={`w-full px-4 py-2 text-xs text-gray-700 whitespace-nowrap hover:bg-gray-100 hover:text-primary ${
                  selectedFilter === filter &&
                  `bg-primary text-white hover:text-white`
                }`}
              >
                {typeof filter !== "string" && "label" in filter
                  ? filter.label
                  : filter}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersDropdown;
