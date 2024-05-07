"use client";

import React, { ReactNode } from "react";
import { useDarkModeStore } from "@/libs/store";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const DarkModeContainer = ({ children }: { children: ReactNode }) => {
  const darkMode = useDarkModeStore();
  return (
    <div className={`${darkMode ? `dark` : ``}`}>
      <div className={`fixed top-1/2 left-3 -translate-y-1/2 z-30 xs:hidden`}>
        {darkMode ? (
          <button
            className={`text-white`}
            onClick={() => useDarkModeStore.setState(false)}
            aria-label="light mode"
          >
            <SunIcon className={`w-6 h-6 hover:text-yellow-300`} />
          </button>
        ) : (
          <button
            className={`text-black`}
            onClick={() => useDarkModeStore.setState(true)}
            aria-label="dark mode"
          >
            <MoonIcon className={`w-6 h-6 hover:text-gray-400`} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default DarkModeContainer;
