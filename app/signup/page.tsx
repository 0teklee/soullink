import React from "react";
import SignupTemplate from "@/components/signup/SignupTemplate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
  const session = await getServerSession(authOptions);
  return <SignupTemplate session={session} />;
};

export default Page;
