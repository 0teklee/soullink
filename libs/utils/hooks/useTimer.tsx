"use client";

import React, { useEffect, useState } from "react";

const useTimer = (handler: () => void, delay = 100) => {
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);

  useEffect(() => {
    const newTimer = setTimeout(handler, delay);
    if (!timer) {
      setTimer(newTimer);
    }
    clearTimeout(newTimer);
  }, []);

  return { timer };
};

export default useTimer;
