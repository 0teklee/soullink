"use client";

import React, { Fragment, useEffect, useState } from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import ImageCardItem from "@/components/common/carousel/img-card/ImageCardItem";
import { fillEmptyPlaylist } from "@/libs/utils/client/commonUtils";
import { getItemMotionInitial } from "@/libs/utils/client/framerMotionUtils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { interval5Seconds } from "@/libs/utils/client/contants/commonValues";

const ImageCardContainer = ({ playlists }: { playlists?: PlaylistType[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const processedLists = fillEmptyPlaylist(playlists || []);

  const controls = useAnimationControls();

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0 && !processedLists[processedLists.length - 1].title) {
        return prevIndex;
      }

      if (!processedLists[prevIndex - 1].title) {
        return prevIndex;
      }

      if (prevIndex === 0) {
        return processedLists.length - 1;
      }
      return prevIndex - 1;
    });
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      if (!processedLists[prevIndex + 1].title) {
        return prevIndex;
      }

      if (prevIndex === processedLists.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => {
        if (!processedLists[prevIndex + 1].title) {
          return prevIndex;
        }

        if (prevIndex === processedLists.length - 1) return 0;
        return prevIndex + 1;
      });
    }, interval5Seconds);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    controls.start("active");
  }, [activeIndex]);

  return (
    <div
      className={`relative flex items-center justify-center w-full h-60 py-2 group`}
    >
      <AnimatePresence>
        {processedLists.map((playlist, itemIndex, arr) => {
          const { initial, center } = getItemMotionInitial(
            itemIndex,
            arr,
            activeIndex,
          );
          return (
            <Fragment
              key={`${playlist.mood.name}_${itemIndex}_${playlist.title}_container`}
            >
              <motion.div
                className={`absolute playlist_card_${itemIndex} h-full`}
                initial={initial}
                animate={activeIndex === itemIndex ? center : initial}
                drag={`x`}
                dragConstraints={{ left: 0, right: 50 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 0) {
                    handlePrev();
                  } else {
                    handleNext();
                  }
                }}
              >
                <ImageCardItem
                  playlist={playlist}
                  index={itemIndex}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              </motion.div>
            </Fragment>
          );
        })}
        <div
          className={`absolute top-1/2 -translate-y-1/2 flex gap-3 items-center justify-between w-full group-hover:text-primary group-hover:opacity-100 opacity-0 xs:z-30`}
        >
          <button onClick={handlePrev}>
            <ChevronLeftIcon className={`w-12 h-12 mix-blend-difference`} />
          </button>
          <button onClick={handleNext}>
            <ChevronRightIcon className={`w-12 h-12 mix-blend-difference`} />
          </button>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ImageCardContainer;
