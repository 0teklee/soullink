"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserSessionType } from "@/types/common/userType";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeaderUser = () => {
  const { data: session, status } = useSession();
  const userSession = session as UserSessionType;
  const isLogin = !!userSession?.userId;
  const router = useRouter();
  const isLoading = status === "loading";

  const [isListClicked, setIsListClicked] = useState(false);

  const login = async () => {
    if (!isLogin) {
      router.push(`/signup`);
      return;
    }
    await signIn("google");
  };

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: `/` });
  };

  return (
    <>
      <div className={`flex items-center font-medium gap-6 xs:hidden`}>
        {!isLoading && !isLogin && (
          <>
            <button
              className={`text-gray-100`}
              onClick={async () => {
                await login();
              }}
            >
              login
            </button>
            <button
              className={`text-primary whitespace-nowrap`}
              onClick={async () => {
                login();
              }}
            >
              Sign up
            </button>
          </>
        )}
        {!isLoading && !!isLogin && (
          <div className={`relative flex items-center`}>
            <button
              className={`flex items-center`}
              onClick={() => {
                setIsListClicked((prev) => !prev);
              }}
            >
              <Image
                className={`rounded-full`}
                src={`${
                  userSession?.userImage || `/image/common/default_profile.svg`
                }`}
                alt={`profile`}
                width={36}
                height={36}
              />
            </button>
            {isListClicked && (
              <div
                className={`absolute flex flex-col gap-3 top-12 -right-3 p-2 text-gray-900 text-xs whitespace-nowrap bg-white border border-gray-300 rounded `}
              >
                <button
                  className={`hover:text-primary`}
                  onClick={() => {
                    router.push(`/`);
                  }}
                >
                  Home
                </button>
                <button
                  className={`hover:text-primary`}
                  onClick={() => {
                    router.push(`/user/${userSession?.userNickname}`);
                  }}
                >
                  My Page
                </button>
                <button
                  className={`hover:text-primary`}
                  onClick={() => {
                    router.push(`/playlist/create`);
                  }}
                >
                  Create Playlist
                </button>
                <button
                  className={`text-gray-900 hover:text-pink-500`}
                  onClick={async () => {
                    await logout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`relative hidden xs:block`}>
        <button
          className={`flex items-center`}
          onClick={() => {
            setIsListClicked((prev) => !prev);
          }}
        >
          <Image
            className={`cursor-pointer rounded-full`}
            src={`${
              isLogin
                ? userSession?.userImage || "/image/common/default_profile.svg"
                : "/image/common/mobile_header_menu.svg"
            }`}
            alt={`mobile_header`}
            width={32}
            height={32}
          />
        </button>
        {isListClicked && !isLoading && isLogin && (
          <div
            className={`absolute flex flex-col gap-3 top-12 -right-3 p-2 text-gray-900 text-sm whitespace-nowrap bg-white border border-gray-300 rounded `}
          >
            <button
              className={`hover:bg-gray-200 hover:text-white`}
              onClick={() => {
                router.push(`/user/${userSession?.userNickname}`);
              }}
            >
              My Page
            </button>
            <button
              className={`hover:bg-gray-200 hover:text-white`}
              onClick={() => {
                router.push(`/playlist/create`);
              }}
            >
              Create Playlist
            </button>
          </div>
        )}
        {isListClicked && !isLoading && !isLogin && (
          <div
            className={`absolute flex flex-col gap-3 top-12 right-1 p-2 text-gray-900 text-sm whitespace-nowrap bg-white border border-gray-300 rounded `}
          >
            <button
              className={`text-primary hover:bg-gray-200 hover:text-white`}
              onClick={() => {
                router.push(`/signup`);
              }}
            >
              Sign up
            </button>
            <button
              className={`hover:bg-gray-200 hover:text-white`}
              onClick={async () => {
                await login();
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>{" "}
    </>
  );
};

export default HeaderUser;
