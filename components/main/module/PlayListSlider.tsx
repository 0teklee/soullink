"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import PlaylistItem from "@/components/main/module/PlaylistItem";

import "swiper/css";
import { PlaylistType } from "@/types/common/Song&PlaylistType";

const PlayListSlider = ({ playLists }: { playLists: PlaylistType[] }) => {
  return (
    <>
      <div className={`w-full`}>
        <Swiper
          className={`overflow-fadeout`}
          wrapperClass={`w-full`}
          setWrapperSize={false}
          breakpoints={{
            "400": { slidesPerView: 1, spaceBetween: 0, width: 320 },
            "768": { slidesPerView: 3, spaceBetween: 50 },
            "1300": {
              slidesPerView: 3,
              spaceBetween: 300,
            },
            "1500": { slidesPerView: 2, spaceBetween: 200 },
          }}
        >
          {playLists.map((item, index) => {
            return (
              <SwiperSlide key={`slide_item_${item.id}_${index}`}>
                <PlaylistItem playlistItem={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default PlayListSlider;
