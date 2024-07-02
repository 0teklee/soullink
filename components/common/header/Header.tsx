import React from "react";
import Image from "next/image";
import HeaderUser from "@/components/common/header/HeaderUser";
import Link from "next/link";
import HeaderSearch from "@/components/common/header/HeaderSearch";
import { clsx } from "clsx";
import { Open_Sans } from "next/font/google";
import { cn } from "@/libs/utils/client/ui";

const OpenSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const Header = () => {
  return (
    <div
      className={clsx(
        `fixed top-0 flex items-center justify-between w-screen`,
        `py-2 px-2 lg:px-8 lg:py-3`,
        `bg-gray-100 text-gray-900 border-b-2 border-primary z-50`,
        `dark:text-gray-50 dark:bg-black `,
        OpenSans.className,
      )}
    >
      <div className={`flex items-center w-full h-full gap-6 flex-1`}>
        <Link
          className={`flex items-center justify-start gap-2 text-primary hover:text-opacity-70 `}
          href={`/`}
        >
          <div className={`relative w-8 h-8`}>
            <Image
              className={`rounded-full dark:invert`}
              src={`/soullink_logo.png`}
              alt="logo"
              fill={true}
            />
          </div>
        </Link>
        <div
          className={cn(
            `hidden`,
            `md:flex items-center justify-start gap-4 text-normal whitespace-nowrap font-normal md:text-sm`,
            `dark:text-gray-50 dark:bg-black`,
          )}
        >
          <Link
            href={`/discover`}
            className={`px-3 py-1 hover:bg-primary hover:text-white dark:hover:text-black rounded-lg`}
          >
            Discover
          </Link>
          <Link
            href={`/trending`}
            className={`px-3 py-1 hover:bg-primary hover:text-white dark:hover:text-black rounded-lg`}
          >
            Trending
          </Link>
          <Link
            href={`/search`}
            className={`px-3 py-1 hover:bg-primary hover:text-white dark:hover:text-black rounded-lg`}
          >
            Search
          </Link>
          <Link
            className={`px-3 py-1 hover:bg-primary hover:text-white dark:hover:text-black rounded-lg`}
            href={`/playlist/create`}
          >
            Create list
          </Link>
          <Link
            className={`px-3 py-1  hover:text-primary rounded-lg`}
            href={`/support`}
          >
            Support
          </Link>
        </div>
      </div>
      <div className={`flex items-center gap-4`}>
        <HeaderSearch />
        <HeaderUser />
      </div>
    </div>
  );
};

export default Header;
