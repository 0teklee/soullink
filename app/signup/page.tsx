import React from "react";
import SignupTemplate from "@/components/signup/SignupTemplate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Page = () => {
  return <SignupTemplate />;
};

export default Page;
