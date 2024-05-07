"use client";

import React, { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorFallback from "@/components/common/error/ErrorFallback";
import { MODAL_TYPE } from "@/libs/types/modalType";
import { useModalStore } from "@/libs/store";

const ReactQueryErrorBoundary = ({
  children,
  isLayout = false,
}: {
  children: ReactNode[] | ReactNode;
  isLayout?: boolean;
}) => {
  const setModal = useModalStore((state) => state.setModal);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary, error }) => {
            if (isLayout) {
              setModal(MODAL_TYPE.ERROR, {
                error,
                resetErrorBoundary,
              });
            }

            return isLayout ? null : (
              <ErrorFallback
                error={error}
                resetErrorBoundary={resetErrorBoundary}
              />
            );
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ReactQueryErrorBoundary;
