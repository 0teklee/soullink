"use client";

import React, { useState } from "react";

const useTimer = (handler: () => void, delay = 100) => {
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const resetTimer = (timerParam: NodeJS.Timeout | null) => {
    if (timerParam) {
      clearTimeout(timerParam);
    }
    const newTimer = setTimeout(handler, delay);
    setTimer(newTimer);
  };

  return { timer, resetTimer };
};

export default useTimer;
