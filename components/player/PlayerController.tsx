import React, { ReactNode } from "react";

const PlayerController = ({ children }: { children: ReactNode[] }) => {
  return (
    <div
      className={`w-screen px-5 py-3 bg-white dark:bg-black border-t-[1px] border-gray-200 dark:text-gray-50  xs:py-3 xs:px-3`}
    >
      <div className={`flex items-center justify-between gap-6 px-5 xs:px-0 `}>
        {children}
      </div>
    </div>
  );
};

export default PlayerController;
