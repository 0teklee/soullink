"use client";
import React, { ReactNode } from "react";
import { getCsrfToken, SessionProvider } from "next-auth/react";

const NextAuthSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSessionProvider;
