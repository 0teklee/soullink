import React from "react";
import { useRouter } from "next/navigation";

const CategoriesList = ({
  categories,
}: {
  categories: string[] | { name: string }[];
}) => {
  const router = useRouter();

  const categoriesArr = categories.map((category_item) =>
    typeof category_item === "string" ? category_item : category_item.name,
  );

  return (
    <div
      className={`flex items-center gap-3 text-sm text-gray-700 dark:text-warmGray-50 dark:text-warmGray-50 lg:text-xs `}
    >
      {categoriesArr.map((category_item, index) => (
        <button
          onClick={() => router.push(`/category?category=${category_item}`)}
          className={`px-2 py-1 border border-gray-300 rounded hover:bg-primary hover:text-white hover:border-primary cursor-pointer`}
          key={`${category_item}_${category_item}_${index}`}
        >
          {category_item}
        </button>
      ))}
    </div>
  );
};

export default CategoriesList;
