import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const HeaderLink = ({ href, children, className = "" }: HeaderLinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        `px-2 py-1`,
        `hover:text-gray-50 hover:bg-black`,
        `dark:hover:text-black dark:hover:bg-white rounded ${className}`,
      )}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
