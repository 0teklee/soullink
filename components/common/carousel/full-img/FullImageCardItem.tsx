import React from "react";
import useSelectedPlaylistPlay from "@/libs/utils/hooks/useSelectedPlaylistPlay";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatPathName } from "@/libs/utils/client/formatter";
import { PlaylistType } from "@/libs/types/song&playlistType";

const FullImageCardItem = ({
  playlist,
}: {
  playlist: PlaylistType;
  isEditor?: boolean;
}) => {
  const { title, author, description, coverImage, songs, likedBy } = playlist;
  const { nickname, isEditor: isAuthorEditor } = author;
  const likedByEditorUser = likedBy?.filter((user) => user.isEditor);

  const cover = coverImage || `/image/common/default_cover_image.svg`;
  const { playing, handleChangePlaylistState } =
    useSelectedPlaylistPlay(playlist);
  const router = useRouter();

  return (
    <div
      className={`relative w-screen h-full overflow-hidden py-12 xs:px-4 xs:py-5 xl:px-24 3xl:px-48 desktop:px-[400px]`}
    >
      <div
        className={`flex justify-start items-center gap-10 w-full h-[340px] px-5 xs:flex-col xs:h-[300px]  xs:gap-3  xs:py-4 overflow-hidden `}
      >
        <div className={`absolute bottom-0 right-0 w-full h-full `}>
          <div className={`relative w-full h-full`}>
            <Image
              className={`object-cover overflow-hidden`}
              src={cover}
              alt={`cover`}
              fill={true}
            />
            <div
              className={`absolute top-0 left-0 flex items-center justify-start w-full h-full py-12 xs:px-4 xs:justify-center xl:px-24 3xl:px-48 desktop:px-[400px] z-[3] bg-black bg-opacity-40 opacity-0 hover:opacity-100`}
            >
              <div
                className={`flex flex-col items-start gap-3 xs:items-center xs:gap-0`}
              >
                <div
                  className={`flex flex-col items-start gap-1 w-full xs:items-center xs:gap-0 text-white`}
                >
                  {(isAuthorEditor || likedByEditorUser?.length > 0) && (
                    <div className={`flex items-center justify-start gap-2 `}>
                      <div className={`relative w-5 h-5`}>
                        <Image
                          src={`/soullink_logo.png`}
                          alt={`author`}
                          fill={true}
                        />
                      </div>
                      <p className={`text-base text-primary font-medium`}>
                        {`Featured by ${isAuthorEditor ? nickname : "editors"}`}
                      </p>
                    </div>
                  )}
                  <p
                    className={`text-2xl font-semibold cursor-pointer hover:underline hover:after:content-['⇢'] hover:after:ml-1`}
                    onClick={() => {
                      router.push(`/playlist/${formatPathName(title)}`);
                    }}
                  >
                    {title}
                  </p>
                  <div
                    className={`flex justify-center items-center gap-2 text-sm font-medium`}
                  >
                    <p>
                      {songs?.length} {songs?.length <= 1 ? "song" : "songs"}
                    </p>
                    <p>{likedBy?.length} likes</p>
                  </div>
                  <div
                    onClick={() => {
                      router.push(`/user/${formatPathName(nickname)}`);
                    }}
                    className={`flex justify-center items-center text-base font-normal gap-2 cursor-pointer`}
                  >
                    <p>by</p>
                    <div className={`flex justify-center items-center gap-1`}>
                      <p className={`hover:underline`}>@{nickname}</p>
                      <div
                        className={`relative w-5 h-5 bg-white rounded-full overflow-hidden`}
                      >
                        <Image
                          src={
                            author?.profilePic ||
                            `/image/common/default_profile.svg`
                          }
                          alt={`author`}
                          fill={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`flex flex-col justify-start items-start gap-0.5`}
                >
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullImageCardItem;
