"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import PlaylistSliderItem from "@/components/common/playlist/playlist-slider/PlaylistSliderItem";

import "swiper/css";
import { PlaylistType } from "@/libs/types/song&playlistType";

const PlayListSlider = ({ playlists }: { playlists: PlaylistType[] }) => {
  return (
    <>
      <div className={`w-full`}>
        <Swiper
          className={`overflow-fadeout`}
          wrapperClass={`w-full`}
          speed={1500}
          initialSlide={0}
          fadeEffect={{
            crossFade: false,
          }}
          breakpoints={{
            "400": { slidesPerView: 1, spaceBetween: 0, width: 320 },
            "768": { slidesPerView: 3, spaceBetween: 50 },
            "1300": {
              slidesPerView: 1,
              spaceBetween: 10,
              width: 400,
            },
          }}
        >
          {playlists.map((item, index) => {
            return (
              <SwiperSlide key={`slide_item_${item.id}_${index}`}>
                <PlaylistSliderItem playlistItem={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default PlayListSlider;
