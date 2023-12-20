"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";

const AuthUserNavigator = () => {
  const { data: session } = useSession() as { data: UserSessionType | null };
  const router = useRouter();

  useEffect(() => {
    if (session && !session?.userId) {
      router.push("/signup");
    }
  }, [session]);
  return <></>;
};

export default AuthUserNavigator;
