"use client";

import React, { useEffect } from "react";
import Title from "@/components/common/module/Title";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className={`flex flex-col items-start gap-3`}>
      <Title size={`h1`} text={`GlobalError`} />
      <div className={`flex flex-col items-start`}>
        <p>Please refresh the page and try again.</p>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
};

export default GlobalError;
