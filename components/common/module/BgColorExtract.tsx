"use client";

import React, { useRef, useEffect, useState } from "react";

const BgColorExtract = ({ imageUrl }: { imageUrl: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColors] = useState("#fff");

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context.getImageData(
        0,
        0,
        image.width,
        image.height,
      ).data;
      let colorCode = "";

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const hex = `#${r.toString(16).padStart(2, "0")}${g
          .toString(16)
          .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

        colorCode = hex;
      }

      setColors(colorCode);
    };
  }, [imageUrl]);

  return (
    <div
      className={`absolute bg-cover w-full h-full opacity-95`}
      style={{ backgroundColor: color }}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default BgColorExtract;
