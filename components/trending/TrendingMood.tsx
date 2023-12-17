"use client";

import React, { lazy, Suspense, useState } from "react";
import Title from "@/components/common/module/Title";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import Loading from "@/components/common/module/Loading";

const TrendingMoodList = lazy(
  () => import("@/components/trending/module/TrendingMoodList"),
);

const TrendingMood = () => {
  return (
    <section className={`flex flex-col gap-3 w-full`}>
      <Title text={`Trending Moods`} size={`h1`} />
      <ReactQueryErrorBoundary>
        <Suspense fallback={<Loading />}>
          <TrendingMoodList />
        </Suspense>
      </ReactQueryErrorBoundary>
    </section>
  );
};

export default TrendingMood;
