import React from "react";

const CategoriesList = ({
  categories,
  onClick,
  selectedCategory,
}: {
  categories: string[];
  onClick: (val: string) => void;
  selectedCategory?: string;
}) => {
  const sample = null;
  return (
    <div className={`flex items-center gap-3`}>
      {categories.map((category, index) => (
        <button
          onClick={() => onClick(category)}
          key={`category_${category}_${index}`}
          className={`px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded font-medium hover:text-primary ${
            selectedCategory === category &&
            `bg-primary text-white border-primary hover:text-white`
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoriesList;
