import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useModalStore } from "@/libs/store";

const CommonErrorModal = () => {
  const router = useRouter();
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const errorModalProps = useModalStore((state) => state.errorModalProps);
  const { error, resetErrorBoundary } = errorModalProps || {};
  const errorMessage =
    error && error.message ? error.message : "An Error occurred.";

  console.error("caught on error boundary : ", errorMessage);

  return (
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
            if (resetErrorBoundary) {
              resetErrorBoundary();
            }
            router.back();
            setModalOpen(false);
          }}
          className={`px-4 py-2 bg-gray-300 text-white rounded-md`}
        >
          Go back
        </button>
        <button
          onClick={() => {
            if (resetErrorBoundary) {
              resetErrorBoundary();
            }
            setModalOpen(false);
          }}
          className={`flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md`}
        >
          Refresh
          <ArrowPathIcon className={`w-4 h-4`} />
        </button>
      </div>
    </div>
  );
};

export default CommonErrorModal;
