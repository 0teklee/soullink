"use client";

import React, { useEffect, useState } from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import { motion, useAnimationControls } from "framer-motion";
import TopListItem from "@/components/common/playlist/top-playlist/TopListItem";

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
    <div className={`relative w-full h-full`}>
      <div className={`absolute left-0 w-full`}>
        <motion.div animate={controls}>
          <TopListItem playlist={playlists[currentIndex]} />
        </motion.div>
      </div>
    </div>
  );
};

export default TopListContainter;
