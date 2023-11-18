"use client";

import React, { useEffect, useState } from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { motion, useAnimationControls } from "framer-motion";
import { fillEmptyPlaylist } from "@/libs/utils/client/commonUtils";
import FullImageCardItem from "@/components/common/carousel/full-img/FullImageCardItem";

const FullImageCardContainer = ({
  playlists,
}: {
  playlists?: PlaylistType[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimationControls();
  const formattedPlaylists = fillEmptyPlaylist(playlists);

  const handleDelay = () => {
    setCurrentIndex((prev) => {
      if (prev === formattedPlaylists.length - 1) {
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
    <div className={`relative w-full h-full `}>
      <div className={` w-full`}>
        <motion.div animate={controls}>
          <FullImageCardItem playlist={formattedPlaylists[currentIndex]} />
        </motion.div>
      </div>
    </div>
  );
};

export default FullImageCardContainer;
