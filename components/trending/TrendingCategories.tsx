"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import TrendingCategoriesList from "@/components/trending/module/TrendingCategoriesList";

const TrendingCategories = () => {
  return (
    <section className={`flex flex-col gap-3 w-full`}>
      <Title text={`Trending Categories`} size={`h1`} />
      <ReactQueryErrorBoundary>
        <TrendingCategoriesList />
      </ReactQueryErrorBoundary>
    </section>
  );
};

export default TrendingCategories;
