"use client";

import React, { lazy, Suspense, useEffect, useState } from "react";
import Title from "@/components/common/module/Title";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import Loading from "@/components/common/module/Loading";
const TrendingCategoriesList = lazy(
  () => import("@/components/trending/module/TrendingCategoriesList"),
);

const TrendingCategories = () => {
  return (
    <section className={`flex flex-col gap-3 w-full`}>
      <Title text={`Trending Categories`} size={`h1`} />
      <ReactQueryErrorBoundary>
        <Suspense fallback={<Loading />}>
          <TrendingCategoriesList />
        </Suspense>
      </ReactQueryErrorBoundary>
    </section>
  );
};

export default TrendingCategories;
