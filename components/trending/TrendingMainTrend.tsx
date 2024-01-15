"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import TrendingMainList from "@/components/trending/module/TrendingMainList";

const TrendingMainTrend = () => {
  return (
    <section className={`flex flex-col gap-3 w-full`}>
      <Title text={`Trending Playlist`} size={`h1`} />
      <div className={`flex flex-col gap-2`}>
        <ReactQueryErrorBoundary>
          <TrendingMainList />
        </ReactQueryErrorBoundary>
      </div>
    </section>
  );
};

export default TrendingMainTrend;
