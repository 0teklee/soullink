import React from "react";
import UserTemplate from "@/components/user/UserTemplate";

import { sampleUser } from "@/utils/client/commonStaticApiData";

const Page = () => {
  return <UserTemplate userProps={sampleUser} />;
};

export default Page;

export const generateStaticParams = async () => {
  return [1, 2, 3, 4];
};
