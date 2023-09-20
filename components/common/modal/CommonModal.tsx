"use client";

import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";

const ModalContainer = ({
  children,
  setIsModalOpen,
  isOutsideClick,
}: {
  children: ReactNode[] | ReactNode;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isOutsideClick: boolean;
}) => (
  <div
    onClick={() => {
      if (!isOutsideClick) {
        return;
      }
      setIsModalOpen(false);
    }}
    className={`fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-gray-500 bg-opacity-30 transition-opacity z-20`}
  >
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`w-fit px-10 py-8 bg-white rounded-lg shadow-xl`}
    >
      {children}
    </div>
  </div>
);

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
