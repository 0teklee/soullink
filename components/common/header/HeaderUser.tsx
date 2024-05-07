"use client";

import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";
import useClickOutside from "@/libs/utils/hooks/useClickOutside";
import { useDarkModeStore } from "@/libs/store";
import ProfileImage from "@/components/common/atom/ProfileImage";
import HeaderMenuItem from "@/components/common/header/HeaderMenuItem";
import { clsx } from "clsx";

const HeaderUser = () => {
  const { data: session, status } = useSession();
  const userSession = session as UserSessionType;
  const darkMode = useDarkModeStore();
  const [isLogin, setIsLogin] = useState(!!userSession?.userId);
  const listRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "loading";

  const [isListClicked, setIsListClicked] = useState(false);

  const login = async () => {
    await signIn("google", {
      redirect: true,
    });
  };

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: `/` });
  };

  const handleClickOutside = () => {
    setIsListClicked(false);
  };

  useClickOutside({
    ref: listRef,
    handler: handleClickOutside,
  });

  useEffect(() => {
    setIsLogin(!!userSession?.userId);
  }, [session]);

  return (
    <div ref={listRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsListClicked((prev) => !prev);
        }}
        className={`relative w-8 h-8`}
      >
        <ProfileImage
          src={
            isLogin
              ? userSession?.userImage || `/image/common/default_profile.svg`
              : "/image/common/mobile_header_menu.svg"
          }
          alt={`mobile_header`}
          isLogin={isLogin}
        />
        {isListClicked && !isLoading && (
          <div
            className={clsx(
              `fixed top-14 right-0 flex flex-col items-start gap-3`,
              `flex flex-col items-start gap-3`,
              `w-screen max-w-xs p-2`,
              `text-gray-900 text-sm whitespace-nowrap`,
              `bg-white border border-gray-300 rounded`,
              `xs:w-screen xs:fixed xs:top-12 xs:left-0 xs:max-w-none`,
              `dark:bg-black dark:border-gray-700 dark:text-warmGray-50`,
            )}
          >
            <HeaderMenuItem
              isLogin={isLogin}
              userSession={userSession}
              login={login}
              logout={logout}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderUser;
