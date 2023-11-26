"use client";

import { createElement, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const elementProps = { children, id: "portal" };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser || typeof document === "undefined") {
    return null;
  }

  const PortalComponent = createElement("div", elementProps);

  return createPortal(PortalComponent, document.body);
};

export default ModalPortal;
