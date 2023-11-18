import React from "react";
import UserTemplate from "@/components/user/UserTemplate";
import {
  getSingleUserProfile,
  getUsersPaths,
} from "@/libs/utils/client/fetchers";
import PlaylistUpdateProvider from "@/components/common/playlist/PlaylistUpdateProvider";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getSingleUserProfile(id);

  return (
    <PlaylistUpdateProvider propsData={userData.createdPlaylists}>
      <UserTemplate id={id} userProps={userData} />
    </PlaylistUpdateProvider>
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
