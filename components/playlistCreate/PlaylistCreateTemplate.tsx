"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import Image from "next/image";
import Table from "@/components/common/module/Table";

const PlaylistCreateTemplate = () => {
  const a = 1;
  return (
    <section
      className={`flex flex-col items-center justify-center gap-10 xs:py-5 py-12`}
    >
      <Title size={`h1`} text={`Create Playlist`} />
      <div
        className={`flex flex-col items-center justify-center cursor-pointer`}
      >
        <p className={`mb-3 text-gray-500 text-base font-normal`}>add cover</p>
        <div
          className={`flex items-center justify-center w-[300px] h-[300px] bg-gray-100 border border-gray-300 rounded-xl`}
        >
          <Image
            src={`/image/common/plus.svg`}
            width={36}
            height={36}
            alt={`add cover`}
          />
        </div>
      </div>
      <Table songList={[]} isCreate={true} />
      <div
        className={`flex flex-col items-start w-full pr-12 xs:pr-0 xs:w-[300px] xs:items-center xs:justify-center`}
      >
        <Title size={`h2`} text={`Description`} />
        <textarea
          className={`w-full h-full max-w-3xl min-h-[200px] mt-3 px-5 pt-2 text-gray-900 bg-white border border-gray-300 resize-none rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
        />
      </div>
    </section>
  );
};

export default PlaylistCreateTemplate;
