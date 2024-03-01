import React from "react";
import { clsx } from "clsx";

interface HeaderButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const HeaderButton = ({
  onClick,
  children,
  className = "",
}: HeaderButtonProps) => {
  return (
    <button
      className={clsx(
        `px-2 py-1`,
        `hover:text-gray-50 hover:bg-black`,
        `dark:hover:text-black dark:hover:bg-white rounded ${className}`,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default HeaderButton;
