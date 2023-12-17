"use client";

import React, { useEffect, useState } from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { motion, useAnimationControls } from "framer-motion";
import FullImageCardItem from "@/components/common/carousel/full-img/FullImageCardItem";

const FullImageCardContainer = ({
  playlists,
}: {
  playlists?: PlaylistType[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    controls.set({ opacity: 0, x: 100 });
    controls.start({
      opacity: 100,
      x: 0,
      transition: { ease: "easeInOut", duration: 0.6 },
    });
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!playlists) {
        return;
      }
      setCurrentIndex((prev) => (prev + 1) % playlists.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [playlists]);

  return (
    <div className={`relative w-full h-full `}>
      <div className={` w-full`}>
        {playlists && (
          <motion.div animate={controls}>
            <FullImageCardItem playlist={playlists[currentIndex]} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FullImageCardContainer;
