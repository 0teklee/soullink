import React from "react";

const FiltersList = ({
  filters,
  onClick,
  selectedFilter,
}: {
  filters: string[];
  onClick: (val: string) => void;
  selectedFilter?: string | string[];
}) => {
  const isSelected = (filter: string) =>
    typeof selectedFilter === "string"
      ? selectedFilter === filter
      : selectedFilter?.includes(filter);

  return (
    <div className={`flex items-center gap-3`}>
      {filters.map((filter, index) => (
        <button
          onClick={() => onClick(filter)}
          key={`category_${filter}_${index}`}
          className={`px-2 py-1 text-sm text-gray-700 dark:text-warmGray-50 border border-gray-300 rounded font-medium hover:text-primary ${
            isSelected(filter) &&
            `bg-primary text-white border-primary hover:text-white`
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FiltersList;
