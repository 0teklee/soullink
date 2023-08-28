import React from "react";
import { UserType } from "@/types/common/userType";
import Image from "next/image";
import BgColorExtract from "@/components/common/module/BgColorExtract";

const UserHeader = ({ userProfile }: { userProfile: UserType }) => {
  const { nickname, profilePic, followers, following, bio, playedCount } =
    userProfile;
  return (
    <div className={`absolute left-0 w-screen`}>
      <div className={`relative w-full h-full`}>
        <BgColorExtract imageUrl={profilePic} />
        <div
          className={`relative left-0 flex items-start justify-start w-screen h-full mt-10 xs:my-10 pt-12 pb-4 xs:py-2 xs:px-4 xl:px-24 3xl:px-48 desktop:px-[400px] gap-x-[60px] bg-transparent xs:flex-col xs:items-center xs:justify-center`}
        >
          <div
            className={`profile-card relative flex flex-col items-center gap-y-3 z-10`}
          >
            <div className={`group xs:relative`}>
              <div
                className={`absolute -top-8 flex items-center justify-center gap-2 w-full xs:h-full xs:top-0 xs:bg-black xs:bg-opacity-50 xs:opacity-0 xs:group-hover:opacity-100 xs:transition-opacity z-20`}
              >
                <p className={`text-xl`}>Follow</p>
                <Image
                  className={`bg-blend-difference z-1`}
                  src={`/image/common/plus.svg`}
                  alt={`plus`}
                  width={24}
                  height={24}
                />
              </div>
              <div className={`relative w-[250px] h-[250px]`}>
                <Image src={profilePic} alt={nickname} fill={true} />
              </div>
            </div>
            <div className={`flex flex-col items-center gap-1`}>
              <div className={`flex items-center justify-center`}>
                <p className={`text-2xl font-semibold bg-blend-difference`}>
                  {nickname}
                </p>
              </div>
              <div className={`bg-transparent`}>
                <div className={`mb-1`}>
                  <p
                    className={`text-center text-sm font-normal bg-blend-difference`}
                  >
                    {playedCount} played
                  </p>
                  <div
                    className={`flex items-center justify-between max-w-full text-sm gap-3 bg-blend-difference`}
                  >
                    <p>following {following.length}</p>
                    <p>follower {followers.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`w-full max-w-5xl line-clamp-[12] overflow-ellipsis`}
            >
              <p className={`text-base bg-blend-difference`}>{!!bio && bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
