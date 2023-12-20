"use client";

import React, { useEffect, useState } from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { motion, useAnimationControls } from "framer-motion";
import TopListItem from "@/components/common/playlist/screen-width-slider/TopListItem";

const TopListContainter = ({ playlists }: { playlists: PlaylistType[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimationControls();
  const handleDelay = () => {
    setCurrentIndex((prev) => {
      if (prev === playlists.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    controls.set({ opacity: 0, x: 100 });
    controls.start({
      opacity: 100,
      x: 0,
      transition: { ease: "easeInOut" },
    });
  }, [currentIndex]);

  useEffect(() => {
    setInterval(handleDelay, 1000 * 10);
  }, []);

  return (
    <div className={`h-top-list-container`}>
      <div
        className={`w-screen xs:-mx-4 desktop:-mx-[400px] xl:-mx-24 3xl:-mx-48`}
      >
        <div className={`relative w-full h-full `}>
          <motion.div animate={controls}>
            <TopListItem playlist={playlists[currentIndex]} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopListContainter;
