"use client";

import React from "react";
import { UserType } from "@/libs/types/userType";
import UserHeader from "@/components/user/UserHeader";
import Title from "@/components/common/module/Title";
import PlayListSlider from "@/components/common/playlist/PlayListSlider";
import CommentContainer from "@/components/common/comments/CommentContainer";
import SongTable from "@/components/common/song/table/SongTable";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { useQueries } from "react-query";
import {
  getRecentPlaylists,
  getSingleUserProfile,
} from "@/libs/utils/client/fetchers";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";
import {
  QUERY_CACHE_TIME,
  QUERY_STALE_TIME,
} from "@/libs/utils/client/commonValues";

const UserTemplate = ({
  id,
  userProps,
  recentPlayed,
  userId,
}: {
  id: string;
  userProps: UserType;
  recentPlayed?: PlaylistType[];
  userId?: string;
}) => {
  const [userDataQuery, recentQuery] = useQueries([
    {
      queryKey: ["user", id],
      queryFn: () => getSingleUserProfile(id),
      enabled: !!id,
      initialData: userProps,
      cacheTime: QUERY_CACHE_TIME,
      staleTime: QUERY_STALE_TIME,
    },
    {
      queryKey: ["recentPlayed", id],
      queryFn: () => getRecentPlaylists(userProps?.id),
      enabled: !!userProps?.id,
      initialData: recentPlayed,
    },
  ]);

  const { data: userData } = userDataQuery || {};
  const { data: recentPlayedPlayLists } = recentQuery || {};

  const {
    nickname,
    createdPlaylists,
    id: profileId,
    likedSong,
    likedPlaylists,
  } = userData || {};

  const isCreatedPlaylistsEmpty = createdPlaylists?.length === 0;
  const isRecentPlayedEmpty = recentPlayedPlayLists?.length === 0;

  return (
    <section className={`flex flex-col items-center gap-10 pb-10`}>
      {userData && <UserHeader userProfile={userData} userId={userId} />}
      <div
        className={`flex flex-col gap-3 items-start w-full text-gray-900 mt-[520px]`}
      >
        <Title size={`h1`} text={`Playlists by ${nickname}`} />
        {createdPlaylists && !isCreatedPlaylistsEmpty && (
          <PlayListSlider playlists={createdPlaylists} />
        )}
        {createdPlaylists && isCreatedPlaylistsEmpty && (
          <Title size={`h1`} text={`No Playlists`} />
        )}
      </div>
      {likedPlaylists && likedPlaylists.length > 0 && (
        <div className={`flex flex-col gap-3 w-full`}>
          <Title size={`h1`} text={`Liked Playlists`} />
          <PlaylistListContainer playlists={likedPlaylists} isLarge={true} />
        </div>
      )}
      {recentPlayedPlayLists && !isRecentPlayedEmpty && (
        <div className={`flex flex-col gap-3 items-start w-full text-gray-900`}>
          <Title size={`h1`} text={`Recent played`} />
          <PlaylistListContainer playlists={recentPlayedPlayLists} />
        </div>
      )}
      <div className={`flex flex-col gap-3 w-full`}>
        <Title size={`h1`} text={`Liked Songs`} />
        {likedSong && (
          <SongTable
            songList={likedSong.songs}
            isCreate={false}
            playlist={likedSong as PlaylistType}
            userId={userId}
          />
        )}
      </div>
      <div className={`flex flex-col gap-3 items-start w-full text-gray-900`}>
        <Title size={`h2`} text={`Guestbook`} />
        {profileId && (
          <CommentContainer
            postId={profileId}
            userId={userId}
            isProfile={true}
          />
        )}
      </div>
    </section>
  );
};

export default UserTemplate;
