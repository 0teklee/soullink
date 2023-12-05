import React from "react";
import { ErrorModalPropsType } from "@/libs/types/modalType";
import CommonModal from "@/components/common/modal/CommonModal";
import { useRecoilState } from "recoil";
import { CommonModalState } from "@/libs/recoil/modalAtoms";
import { useRouter } from "next/navigation";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const CommonErrorModal = ({
  error,
  resetErrorBoundary,
}: ErrorModalPropsType) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useRecoilState(CommonModalState);
  const errorMessage =
    error && error.message ? error.message : "An Error occurred.";

  console.error("caught on error boundary : ", errorMessage);
  return (
    <CommonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className={`flex flex-col items-center gap-3 max-w-lg`}>
        <div className={`flex flex-col items-center gap-1`}>
          <ExclamationTriangleIcon className={`w-8 h-8 text-gray-500`} />
          <p className={`text-md text-gray-900 font-semibold`}>
            Oops! Something went wrong.
          </p>
        </div>
        <div className={`flex items-center justify-center gap-2`}>
          <button
            onClick={() => {
              resetErrorBoundary();
              router.back();
              setIsModalOpen(false);
            }}
            className={`px-4 py-2 bg-gray-300 text-white rounded-md`}
          >
            Go back
          </button>
          <button
            onClick={() => {
              resetErrorBoundary();
              setIsModalOpen(false);
            }}
            className={`flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md`}
          >
            Refresh
            <ArrowPathIcon className={`w-4 h-4`} />
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default CommonErrorModal;
