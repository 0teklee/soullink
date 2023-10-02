"use client";
import React, { RefObject, useEffect, useState } from "react";

export const useClickOutside = ({
  ref,
  handler,
}: {
  ref: RefObject<HTMLDivElement>;
  handler: EventListener;
}) => {
  useEffect(() => {
    const listener: EventListener = (event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
