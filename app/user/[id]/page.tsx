import React from "react";
import UserTemplate from "@/components/user/UserTemplate";
import {
  getRecentPlaylists,
  getSingleUserProfile,
  getUsersPaths,
} from "@/libs/utils/client/fetchers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSessionType } from "@/libs/types/userType";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const [userData, recentPlayedPlaylist] = await Promise.all([
    getSingleUserProfile(id),
    getRecentPlaylists(id),
  ]);

  const { userId } = await getServerSession(authOptions).then(
    (session) => (session as UserSessionType) || {},
  );

  return (
    <UserTemplate
      id={id}
      userProps={userData}
      userId={userId}
      recentPlayed={recentPlayedPlaylist}
    />
  );
};

export default Page;

export const generateStaticParams = async () => {
  const paths = await getUsersPaths();

  return paths;
};

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id) {
    return {};
  }

  const data = await getSingleUserProfile(id);

  if (!data) {
    return {};
  }

  const ImageSrc =
    data?.profilePic ??
    `${process.env.NEXT_APP_BASE_URL}/image/common/default_cover_image.svg`;

  return {
    title: `${data?.nickname || ""} on soullink`,
    description: data?.bio || "",
    openGraph: {
      title: `${data?.nickname || ""} on soullink`,
      description: data?.bio || "",
      images: ImageSrc,
    },
  };
}
