"use client";

import React from "react";
import Search from "@/components/common/search/Search";
import Title from "@/components/common/module/Title";
import { useSearchParams } from "next/navigation";

const CategoryTemplate = () => {
  const searchParam = useSearchParams();
  const genreTitle = searchParam.get("category");

  return (
    <section className={`flex flex-col gap-8 py-12 min-h-[calc(100vh-60px)]`}>
      <Title size={`h1`} text={genreTitle || "Category"} />
      <Search isHeader={false} isCategory={true} params={genreTitle} />
    </section>
  );
};

export default CategoryTemplate;
