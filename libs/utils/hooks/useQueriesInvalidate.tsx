"use client";

import React from "react";
import { useQueryClient } from "react-query";

const UseQueriesInvalidate = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = (queries: string | string[]) => {
    if (typeof queries === "string") {
      queryClient.invalidateQueries([queries]);
    }

    if (Array.isArray(queries)) {
      queries.forEach((query) => queryClient.invalidateQueries([query]));
    }
  };

  return { invalidateQueries };
};

export default UseQueriesInvalidate;
