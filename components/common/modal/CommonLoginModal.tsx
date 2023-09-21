"use client";

import React, { Dispatch, SetStateAction } from "react";
import Title from "@/components/common/module/Title";
import { signIn } from "next-auth/react";
import CommonModal from "@/components/common/modal/CommonModal";

const CommonLoginModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const login = async () => {
    await signIn("google");
  };

  return (
    <CommonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
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
    </CommonModal>
  );
};

export default CommonLoginModal;
