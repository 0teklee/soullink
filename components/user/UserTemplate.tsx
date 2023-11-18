"use client";

import React from "react";
import { UserSessionType, UserType } from "@/libs/types/userType";
import UserHeader from "@/components/user/UserHeader";
import Title from "@/components/common/module/Title";
import PlayListSlider from "@/components/common/playlist/PlayListSlider";
import CommentContainer from "@/components/common/comments/CommentContainer";
import { useSession } from "next-auth/react";
import SongTable from "@/components/common/song/table/SongTable";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { useQuery } from "react-query";
import { getSingleUserProfile } from "@/libs/utils/client/fetchers";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";
import {
  QUERY_CACHE_TIME,
  QUERY_STALE_TIME,
} from "@/libs/utils/client/commonValues";

const UserTemplate = ({
  id,
  userProps,
}: {
  id: string;
  userProps: UserType;
}) => {
  const { data: session } = useSession() as { data: UserSessionType };

  const { data: userData } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getSingleUserProfile(id),
    enabled: !!id,
    initialData: userProps,
    cacheTime: QUERY_CACHE_TIME,
    staleTime: QUERY_STALE_TIME,
  });

  const {
    nickname,
    createdPlaylists,
    id: profileId,
    likedSong,
    likedPlaylists,
  } = userData || {};
  const isPlaylistsEmpty = createdPlaylists?.length === 0;

  return (
    <section className={`flex flex-col items-center gap-10 pb-10`}>
      <UserHeader userProfile={userProps} session={session} />
      <div
        className={`flex flex-col gap-3 items-start w-full text-gray-900 mt-[520px]`}
      >
        <Title size={`h1`} text={`Playlists by ${nickname}`} />
        {createdPlaylists && !isPlaylistsEmpty && (
          <PlayListSlider playLists={createdPlaylists} />
        )}
        {createdPlaylists && isPlaylistsEmpty && (
          <Title size={`h2`} text={`No Playlists`} />
        )}
      </div>
      <div className={`flex flex-col gap-3 w-full`}>
        <Title size={`h2`} text={`Liked Playlists`} />
        {likedPlaylists && (
          <PlaylistListContainer playlists={likedPlaylists} isLarge={true} />
        )}
      </div>
      <div className={`flex flex-col gap-3 w-full`}>
        <Title size={`h2`} text={`Liked Songs`} />
        {likedSong && (
          <SongTable
            songList={likedSong.songs}
            isCreate={false}
            playlist={likedSong as PlaylistType}
          />
        )}
      </div>
      <div className={`flex flex-col gap-3 items-start w-full text-gray-900`}>
        <Title size={`h2`} text={`Guestbook`} />
        {profileId && (
          <CommentContainer
            postId={profileId}
            userId={session?.userId}
            isProfile={true}
          />
        )}
      </div>
    </section>
  );
};

export default UserTemplate;
