import React from "react";
import DetailTemplate from "@/components/playlist/detail/DetailTemplate";
import {
  getPlaylistsPaths,
  getSinglePlaylist,
} from "@/libs/utils/client/fetchers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSessionType } from "@/libs/types/userType";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const playlistData = await getSinglePlaylist(id);
  const { userId } = await getServerSession(authOptions).then((session) => {
    return (session as UserSessionType) || {};
  });

  return <DetailTemplate id={id} propsData={playlistData} userId={userId} />;
};

export default Page;

export const generateStaticParams = async () => {
  const paths = await getPlaylistsPaths();

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

  const data = await getSinglePlaylist(id);

  if (!data) {
    return {};
  }

  const ImageSrc =
    data?.coverImage ??
    `${process.env.NEXT_APP_BASE_URL}/image/common/default_cover_image.svg`;

  return {
    title: `${data?.title || ""} on soullink`,
    description: data?.description || "",
    openGraph: {
      title: `${data?.title || ""} on soullink`,
      description: data?.description || "",
      images: ImageSrc,
    },
  };
}
