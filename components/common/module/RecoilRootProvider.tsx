"use client";

import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

const RecoilRootProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootProvider;
