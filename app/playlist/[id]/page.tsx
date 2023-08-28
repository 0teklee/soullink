import React from "react";
import DetailTemplate from "@/components/detail/DetailTemplate";

import { fakeFirstPlaylistData } from "@/utils/client/commonStaticApiData";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return <DetailTemplate playlistData={fakeFirstPlaylistData} />;
};

export default Page;

export const generateStaticParams = async () => {
  return [1, 2, 3, 4];
};
