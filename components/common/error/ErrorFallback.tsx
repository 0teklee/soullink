import React from "react";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error | null;
  resetErrorBoundary: () => void;
}) => {
  const errorMessage =
    error && error.message ? error.message : "An Error occurred.";

  console.error("Caught by error boundary :", errorMessage);
  return (
    <div className={`flex flex-col items-center gap-3  w-full max-w-lg`}>
      <div className={`flex flex-col items-center gap-1`}>
        <ExclamationTriangleIcon
          className={`w-8 h-8 text-gray-500 dark:text-gray-50`}
        />
        <p
          className={`text-md text-gray-900 dark:text-warmGray-100 font-semibold`}
        >
          Oops! Something went wrong.
        </p>
      </div>
      <button
        onClick={() => {
          resetErrorBoundary();
        }}
        className={`flex items-center justify-center gap-2 px-4 py-2 bg-gray-300 text-gray-600 text-sm font-medium rounded-md`}
      >
        Refresh
        <ArrowPathIcon className={`w-4 h-4`} />
      </button>
    </div>
  );
};

export default ErrorFallback;
