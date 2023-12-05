import React from "react";
import Image from "next/image";

const Loading = ({ size = 100 }: { size?: number }) => {
  return (
    <div className={`flex items-center justify-center w-full h-full`}>
      <Image
        src={`/image/common/loading_spinner.svg`}
        alt={`loading`}
        width={size}
        height={size}
      />
    </div>
  );
};

export default Loading;
