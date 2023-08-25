import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div
      className={`fixed flex items-center justify-start w-screen px-8 py-1.5 bg-gray-400 z-10 xs:py-0.5 xs:px-2 xs:justify-between`}
    >
      <div className={`flex items-center w-full h-full gap-6 xs:flex-1`}>
        <Image src={`/soullink_logo.png`} alt="logo" width={36} height={36} />
        <div
          className={`flex items-center justify-start gap-4 text-gray-200 hover:text-gray-50 whitespace-nowrap font-normal xs:hidden`}
        >
          <button className={`px-3 py-1 hover:bg-primary rounded-lg`}>
            Trending
          </button>
          <button className={`px-3 py-1 hover:bg-primary rounded-lg`}>
            Friends list
          </button>
          <button className={`px-3 py-1 hover:bg-primary rounded-lg`}>
            My list
          </button>
          <button className={`px-3 py-1 hover:bg-primary rounded-lg`}>
            Create list
          </button>
        </div>
      </div>
      <div className={`hidden xs:block`}>
        <Image
          className={`cursor-pointer`}
          src={`/image/common/mobile_header_menu.svg`}
          alt={`mobile_header`}
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default Header;
