"use client";

import React, { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import ModalPortal from "@/components/common/modal/CommonMordalPortal";

const ModalContainer = ({
  children,
  setIsModalOpen,
  isOutsideClick,
}: {
  children: ReactNode[] | ReactNode;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isOutsideClick: boolean;
}) => {
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.body.style.height = "100vh";
    window.addEventListener("keydown", escHandler);

    return () => {
      document.body.style.height = "unset";
      window.removeEventListener("keydown", escHandler);
    };
  }, []);

  return (
    <ModalPortal>
      <div
        onClick={() => {
          if (!isOutsideClick) {
            return;
          }
          setIsModalOpen(false);
        }}
        className={`fixed top-0 left-0 flex flex-col items-center justify-center w-full h-screen bg-gray-500 bg-opacity-30 transition-opacity z-20`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`w-fit max-h-[calc(100vh-180px)] overflow-y-scroll px-10 py-8 bg-white rounded-lg shadow-xl`}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

const CommonModal = ({
  children,
  isModalOpen,
  setIsModalOpen,
  isOutsideClick = true,
}: {
  children: ReactNode[] | ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isOutsideClick?: boolean;
}) => (
  <>
    {isModalOpen && (
      <ModalContainer
        setIsModalOpen={setIsModalOpen}
        isOutsideClick={isOutsideClick}
      >
        {children}
      </ModalContainer>
    )}
  </>
);

export default CommonModal;
