"use client";

import React from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import CardCarouselItem from "@/components/common/playlist/card-carousel/CardCarouselItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/common/atom/carousel";

const CardCarouselContainer = ({
  playlists,
}: {
  playlists: PlaylistType[];
}) => {
  return (
    <div className={`relative w-full h-full`}>
      <Carousel className={`w-full max-w-full `}>
        <CarouselContent className={`-ml-2`}>
          {playlists.map((playlist) => (
            <CarouselItem
              key={playlist.id}
              className={`basis-unset lg:basis-1/4`}
            >
              <CardCarouselItem playlist={playlist} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={`left-1`} />
        <CarouselNext className={`right-1`} />
      </Carousel>
    </div>
  );
};

export default CardCarouselContainer;
