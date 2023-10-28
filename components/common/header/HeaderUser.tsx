"use client";

import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/common/userType";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useClickOutside from "@/libs/utils/hooks/useClickOutside";
import { formatPathName } from "@/libs/utils/client/formatter";

const HeaderUser = () => {
  const { data: session, status } = useSession();
  const userSession = session as UserSessionType;
  const [isLogin, setIsLogin] = useState(!!userSession?.userId);
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "loading";

  const [isListClicked, setIsListClicked] = useState(false);

  const login = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: isLogin ? `/` : "signup",
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
    <>
      <div
        ref={listRef}
        className={`flex items-center font-medium gap-6 xs:hidden`}
      >
        {!isLoading && !isLogin && (
          <>
            <button
              className={`text-gray-100`}
              onClick={async () => {
                await signIn("google", {
                  redirect: true,
                  callbackUrl: isLogin ? `/` : "/signup",
                });
              }}
            >
              login
            </button>
            <button
              className={`text-primary whitespace-nowrap`}
              onClick={async () => {
                await signIn("google", {
                  redirect: true,
                  callbackUrl: isLogin ? `/` : "/signup",
                });
              }}
            >
              Sign up
            </button>
          </>
        )}
        {!isLoading && isLogin && (
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
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`absolute flex flex-col gap-3 top-12 -right-3 p-2 text-gray-900 text-xs whitespace-nowrap bg-white border border-gray-300 rounded `}
              >
                <button
                  className={`hover:text-primary`}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/`);
                    setIsListClicked(false);
                  }}
                >
                  Home
                </button>
                <button
                  className={`hover:text-primary`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (userSession?.userNickname) {
                      router.push(
                        `/user/${formatPathName(userSession.userNickname)}`,
                      );
                    }
                    setIsListClicked(false);
                  }}
                >
                  My Page
                </button>
                <button
                  className={`hover:text-primary`}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/playlist/create`);
                  }}
                >
                  Create Playlist
                </button>
                <button
                  className={`text-gray-900 hover:text-pink-500`}
                  onClick={async (e) => {
                    e.stopPropagation();
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
                if (userSession?.userNickname) {
                  router.push(
                    `/user/${formatPathName(userSession.userNickname)}`,
                  );
                }
                setIsListClicked(false);
              }}
            >
              My Page
            </button>
            <button
              className={`hover:bg-gray-200 hover:text-white`}
              onClick={() => {
                router.push(`/playlist/create`);
                setIsListClicked(false);
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
              onClick={async () => {
                await login().then(() => {
                  if (!userSession?.userId) {
                    router.push(`/signup`);
                  }
                });
              }}
            >
              Sign up
            </button>
            <button
              className={`hover:bg-gray-200 hover:text-white`}
              onClick={async () => {
                await login().then(() => {
                  if (!!userSession?.userId) {
                    router.push(`/signup`);
                  }
                });
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderUser;
