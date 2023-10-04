import React from "react";
import DetailTemplate from "@/components/playlistDetail/DetailTemplate";
import {
  getPlaylistsPaths,
  getSinglePlaylist,
} from "@/libs/utils/client/fetchers";
import process from "process";
import PlaylistUpdateProvider from "@/components/common/playlist/PlaylistUpdateProvider";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const playlistData = await getSinglePlaylist(id);
  return (
    <PlaylistUpdateProvider propsData={playlistData}>
      <DetailTemplate playlistData={playlistData} />
    </PlaylistUpdateProvider>
  );
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
