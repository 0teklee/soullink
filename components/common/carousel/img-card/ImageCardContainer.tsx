"use client";

import React, { useEffect, useState } from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import ImageCardItem from "@/components/common/carousel/img-card/ImageCardItem";
import Title from "@/components/common/module/Title";
import { fillEmptyPlaylist } from "@/libs/utils/client/commonUtils";
import {
  getItemMotionInitial,
  sortArr,
} from "@/components/common/carousel/utils";

const ImageCardContainer = ({ playlists }: { playlists: PlaylistType[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const processedLists = sortArr(fillEmptyPlaylist(playlists), activeIndex);

  const controls = useAnimationControls();

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setActiveIndex((prevIndex) => {
  //       if (prevIndex === processedLists.length - 1) return 0;
  //       return prevIndex + 1;
  //     });
  //   }, 2500);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  useEffect(() => {
    // update motion.div control
    controls.start("active");
    console.log("target processLists: ", sortArr(processedLists, activeIndex));
  }, [activeIndex]);

  return (
    <div
      className={`relative flex items-center justify-center w-full h-96 py-2`}
    >
      <AnimatePresence>
        {!!playlists &&
          playlists.length > 0 &&
          processedLists.map((playlist, itemIndex, arr) => {
            const { initial, center } = getItemMotionInitial(
              itemIndex,
              arr,
              activeIndex,
            );

            return (
              <motion.div
                className={`absolute playlist_card_${itemIndex}`}
                key={`${playlist.mood}_${itemIndex}`}
                initial={initial}
                animate={activeIndex === itemIndex ? center : initial}
              >
                <ImageCardItem
                  key={itemIndex}
                  playlist={playlist}
                  index={itemIndex}
                  setActiveIndex={setActiveIndex}
                />
              </motion.div>
            );
          })}
        <div
          className={`absolute bottom-2 flex gap-3 items-center justify-center text-gray-900 font-semibold`}
        >
          <button
            onClick={() => {
              setActiveIndex((prevIndex) => {
                if (prevIndex === 0) return processedLists.length - 1;
                return prevIndex - 1;
              });

              console.log("prev activeIndex", activeIndex);
            }}
          >
            prev
          </button>
          <button
            onClick={() => {
              setActiveIndex((prevIndex) => {
                if (prevIndex === processedLists.length - 1) return 0;
                return prevIndex + 1;
              });
              console.log("next activeIndex", activeIndex);
            }}
          >
            next
          </button>
        </div>
        {/*{!!playlists ||*/}
        {/*  (playlists.length === 0 && (*/}
        {/*    <Title size={`h3`} text={`No playlists yet`} />*/}
        {/*  ))}*/}
      </AnimatePresence>
    </div>
  );
};

export default ImageCardContainer;
