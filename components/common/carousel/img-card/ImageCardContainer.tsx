"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import ImageCardItem from "@/components/common/carousel/img-card/ImageCardItem";
import Title from "@/components/common/module/Title";
import { fillEmptyPlaylist } from "@/libs/utils/client/commonUtils";
import {
  centerValue,
  getArrAnimateValue,
  getItemMotionInitial,
  sortArr,
} from "@/components/common/carousel/utils";

const ImageCardContainer = ({ playlists }: { playlists: PlaylistType[] }) => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [processedLists, setProcessedLists] = useState(
    fillEmptyPlaylist(playlists),
  );
  const [controls, setControls] = useState(getArrAnimateValue(processedLists));

  const controlKeys = useCallback(
    (index: number) =>
      Object.keys(processedLists).map((item) => Number(item))[index],
    [processedLists, controls],
  );

  const handleClickCard = (index: number) => {
    setProcessedLists((prevLists) => sortArr(prevLists, index));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === processedLists.length - 1) return 0;
      return prevIndex + 1;
    });
    setProcessedLists((prevLists) => sortArr(prevLists, activeIndex));
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0) return processedLists.length - 1;
      return prevIndex - 1;
    });
    setProcessedLists((prevLists) => sortArr(prevLists, activeIndex));
  };

  useEffect(() => {}, [processedLists]);

  return (
    <div
      className={`relative flex items-center justify-center w-full h-96 py-2`}
    >
      <AnimatePresence>
        {!!playlists &&
          playlists.length > 0 &&
          processedLists.map((playlist, itemIndex, arr) => {
            const initial = getItemMotionInitial(itemIndex);
            const controlKey = controlKeys(itemIndex);

            return (
              <motion.div
                className={`absolute playlist_card_${itemIndex}`}
                key={`${playlist.mood}_${itemIndex}`}
                initial={initial}
                animate={controls[controlKey]}
              >
                <ImageCardItem
                  key={itemIndex}
                  playlist={playlist}
                  index={itemIndex}
                  handleClickCard={handleClickCard}
                />
              </motion.div>
            );
          })}
        <div
          className={`absolute bottom-2 flex gap-3 items-center justify-center text-gray-900 font-semibold`}
        >
          <button onClick={handlePrev}>prev</button>
          <p className={`font-bold text-gray-900`}>{activeIndex}</p>
          <button onClick={handleNext}>next</button>
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
