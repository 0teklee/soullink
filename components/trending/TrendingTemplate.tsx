import React, { Fragment } from "react";
import TrendingCategories from "@/components/trending/TrendingCategories";
import TrendingMood from "@/components/trending/TrendingMood";
import TrendingMainTrend from "@/components/trending/TrendingMainTrend";

const TrendingTemplate = () => {
  const sample = null;
  return (
    <div className={`flex flex-col items-start gap-12 py-12 xs:py-5`}>
      <TrendingMainTrend />
      <TrendingCategories />
      <TrendingMood />
    </div>
  );
};

export default TrendingTemplate;
