"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import TrendingMoodList from "@/components/trending/module/TrendingMoodList";

const TrendingMood = () => {
  return (
    <section className={`flex flex-col gap-3 w-full`}>
      <Title text={`Trending Moods`} size={`h1`} />
      <ReactQueryErrorBoundary>
        <TrendingMoodList />
      </ReactQueryErrorBoundary>
    </section>
  );
};

export default TrendingMood;
