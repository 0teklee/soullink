import React from "react";
import Image from "next/image";
import HeaderUser from "@/components/common/header/HeaderUser";
import Link from "next/link";

const Header = () => {
  return (
    <div
      className={`fixed flex items-center justify-between w-screen px-8 py-1.5 bg-gray-400 z-50 xs:py-0.5 xs:px-2 `}
    >
      <div className={`flex items-center w-full h-full gap-6 xs:flex-1`}>
        <Link
          className={`flex items-center justify-center w-9 h-9 text-gray-100 hover:text-gray-50 `}
          href={`/`}
        >
          <Image src={`/soullink_logo.png`} alt="logo" width={36} height={36} />
        </Link>
        <div
          className={`flex items-center justify-start gap-4 text-gray-200  whitespace-nowrap font-normal xs:hidden`}
        >
          <Link
            href={`/discover`}
            className={`px-3 py-1 hover:bg-primary hover:text-white rounded-lg`}
          >
            Discover
          </Link>
          <Link
            href={`/trending`}
            className={`px-3 py-1 hover:bg-primary hover:text-white rounded-lg`}
          >
            Trending
          </Link>
          <Link
            className={`px-3 py-1 hover:bg-primary hover:text-white rounded-lg`}
            href={`/playlist/create`}
          >
            Create list
          </Link>
          <Link
            className={`px-3 py-1 text-emerald-50  hover:text-primary rounded-lg`}
            href={`/support`}
          >
            Support
          </Link>
        </div>
      </div>
      <HeaderUser />
    </div>
  );
};

export default Header;
