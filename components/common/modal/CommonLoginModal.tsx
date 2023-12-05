"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import { signIn } from "next-auth/react";

const CommonLoginModal = () => {
  const login = async () => {
    await signIn("google");
  };

  return (
    <div className={`flex flex-col gap-3 items-center justify-center `}>
      <Title size={`h2`} text={`Need login`} />
      <button
        onClick={async () => {
          login();
        }}
        className={`px-3 py-2 text-base font-medium bg-white text-primary rounded border border-primary`}
      >
        <p>Login with google</p>
      </button>
    </div>
  );
};

export default CommonLoginModal;
