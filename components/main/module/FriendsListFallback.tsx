import React from "react";
import FallbackSection from "@/components/common/fallback/FallbackSection";
import FriendsListContainer from "@/components/main/module/FriendsListContainer";
import { playlistListDefault } from "@/libs/utils/client/contants/fallbackValues";

const FriendsListFallback = () => {
  return (
    <FallbackSection title={`Friends are listening to..`}>
      <FriendsListContainer data={playlistListDefault} />
    </FallbackSection>
  );
};

export default FriendsListFallback;
