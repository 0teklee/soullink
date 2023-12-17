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
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  const [{ userId }] = await Promise.all([
    getServerSession(authOptions)
      .then((session) => (session as UserSessionType) || { userId: "" })
      .catch(() => ({ userId: "" })),
    queryClient.prefetchQuery({
      queryKey: ["user", id],
      queryFn: () => getSingleUserProfile(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ["recentPlayed", id],
      queryFn: () => getRecentPlaylists(id),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserTemplate id={id} userId={userId} />
    </HydrationBoundary>
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

  const ImageSrc = data?.profilePic ?? `/image/common/default_cover_image.svg`;

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
