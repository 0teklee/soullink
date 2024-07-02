import React from "react";

import Image from "next/image";

interface ProfileImageProps {
  src?: string;
  alt: string;
  isLogin: boolean;
}

const ProfileImage = ({
  src,
  alt = "user_profile",
  isLogin,
}: ProfileImageProps) => (
  <Image
    className={`cursor-pointer rounded-full invert dark:invert-0 ${
      isLogin ? "bg-white" : ""
    }`}
    src={src || "/image/common/default_profile.svg"}
    alt={alt}
    fill={true}
  />
);

export default ProfileImage;
