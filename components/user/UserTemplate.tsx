"use client";

import React from "react";
import { UserType } from "@/types/common/userType";
import UserHeader from "@/components/user/UserHeader";
import Title from "@/components/common/module/Title";
import PlayListSlider from "@/components/main/module/PlayListSlider";
import CommentContainer from "@/components/common/comments/CommentContainer";

const UserTemplate = ({ userProps }: { userProps: UserType }) => {
  const { nickname, playlists, myComments } = userProps;
  const isPlaylistsEmpty = playlists.length === 0;
  return (
    <section className={`flex flex-col items-center gap-10 pb-10`}>
      <UserHeader userProfile={userProps} />
      <div
        className={`flex flex-col gap-3 items-start w-full text-gray-900 mt-[520px]`}
      >
        <Title size={`h1`} text={`${nickname}'s Playlist`} />
        {!isPlaylistsEmpty && <PlayListSlider playLists={playlists} />}
        {isPlaylistsEmpty && <Title size={`h2`} text={`No Playlists`} />}
      </div>
      <div className={`flex flex-col gap-3 items-start w-full text-gray-900`}>
        <Title size={`h1`} text={`Guestbook`} />
        <CommentContainer commentList={myComments} />
      </div>
    </section>
  );
};

export default UserTemplate;
