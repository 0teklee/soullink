"use client";

import React, { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { darkModeState } from "@/libs/recoil/atoms";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const DarkModeContainer = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  return (
    <div className={`${darkMode ? `dark` : ``}`}>
      <div className={`fixed top-1/2 left-2 -translate-y-1/2 z-30`}>
        {darkMode ? (
          <button
            className={`text-white`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <SunIcon className={`w-6 h-6 hover:text-yellow-300`} />
          </button>
        ) : (
          <button
            className={`text-black`}
            onClick={() => setDarkMode(!darkMode)}
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
