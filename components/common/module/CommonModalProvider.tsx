"use client";

import React from "react";
import CommonLoginModal from "@/components/common/modal/CommonLoginModal";
import { useRecoilState } from "recoil";
import { CommonLoginModalState } from "@/libs/recoil/atoms";

const CommonModalProvider = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(CommonLoginModalState);
  return (
    <>
      {isModalOpen && (
        <CommonLoginModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default CommonModalProvider;
