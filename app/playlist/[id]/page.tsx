import React from "react";
import DetailTemplate from "@/components/playlist/detail/DetailTemplate";
import {
  getPlaylistsPaths,
  getSinglePlaylist,
} from "@/libs/utils/client/fetchers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSessionType } from "@/libs/types/userType";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  const { userId } = await getServerSession(authOptions)
    .then((session) => (session as UserSessionType) || { userId: "" })
    .catch(() => ({ userId: "" }));

  await queryClient.prefetchQuery({
    queryKey: ["playlist", id],
    queryFn: () => getSinglePlaylist(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailTemplate id={id} userId={userId} />
    </HydrationBoundary>
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
