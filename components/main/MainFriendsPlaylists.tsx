import React from "react";
import Title from "@/components/common/module/Title";
import { getMainPageFriendsPlaylists } from "@/libs/utils/client/fetchers";
import FriendsListContainer from "@/components/main/module/FriendsListContainer";

const MainFriendsPlaylists = async ({ userId }: { userId?: string }) => {
  const data = await getMainPageFriendsPlaylists(userId);
  const dataAvailable = data && data.length > 0;

  return (
    <>
      {dataAvailable && (
        <section className={`flex flex-col items-start gap-4 lg:max-w-sm`}>
          <Title
            text={userId ? `Friends are listening to..` : `New Playlists`}
            size={`h2`}
          />
          <div className={`flex flex-wrap items-start justify-between w-full`}>
            <FriendsListContainer data={data} userId={userId} />
          </div>
        </section>
      )}
    </>
  );
};

export default MainFriendsPlaylists;
