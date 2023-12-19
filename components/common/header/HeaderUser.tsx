"use client";

import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useClickOutside from "@/libs/utils/hooks/useClickOutside";
import { formatPathName } from "@/libs/utils/client/formatter";
import Link from "next/link";
import { darkModeState } from "@/libs/recoil/atoms";
import { useRecoilState } from "recoil";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const HeaderUser = () => {
  const { data: session, status } = useSession();
  const userSession = session as UserSessionType;
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [isLogin, setIsLogin] = useState(!!userSession?.userId);
  const router = useRouter();
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
        className={`flex-1 flex items-center w-full font-medium gap-6 xs:hidden`}
      >
        {!isLoading && !isLogin && (
          <>
            <button
              className={`text-gray-100`}
              onClick={async () => {
                await signIn("google", {
                  redirect: true,
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
                });
              }}
            >
              Sign up
            </button>
          </>
        )}
        {!isLoading && isLogin && (
          <div
            className={`relative flex items-center w-8 h-8 rounded-full bg-white border-[1px] border-gray-300`}
          >
            <button
              onClick={() => {
                setIsListClicked((prev) => !prev);
              }}
            >
              <Image
                className={`object-cover rounded-full`}
                src={`${
                  userSession?.userImage || `/image/common/default_profile.svg`
                }`}
                alt={`profile`}
                fill={true}
              />
            </button>
            {isListClicked && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`absolute flex flex-col gap-3 top-12 -right-3 p-2 text-gray-900 dark:text-warmGray-100 text-xs whitespace-nowrap bg-white border border-gray-300 rounded `}
              >
                <button
                  className={`hover:text-primary`}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/`);
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
                  className={`text-gray-900 dark:text-warmGray-100 hover:text-pink-500`}
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
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsListClicked((prev) => !prev);
        }}
        className={`relative w-8 h-8 hidden xs:block`}
      >
        <Image
          className={`cursor-pointer rounded-full`}
          src={`${
            isLogin
              ? userSession?.userImage || "/image/common/default_profile.svg"
              : "/image/common/mobile_header_menu.svg"
          }`}
          alt={`mobile_header`}
          fill={true}
        />
        {isListClicked && !isLoading && isLogin && (
          <div
            className={`fixed top-12 left-0 flex flex-col w-screen items-start gap-3 p-2 text-gray-900 dark:text-warmGray-100 text-sm whitespace-nowrap bg-white border border-gray-300 rounded `}
          >
            <button
              className={`w-full px-3 py-1 hover:bg-gray-200 hover:text-white`}
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
              className={`w-full px-3 py-1 hover:bg-gray-200 hover:text-white`}
              onClick={() => {
                router.push(`/playlist/create`);
                setIsListClicked(false);
              }}
            >
              Create Playlist
            </button>
            <Link
              href={`/discover`}
              className={`w-full px-3 py-1 hover:bg-primary hover:text-white rounded-lg`}
            >
              Discover
            </Link>
            <Link
              href={`/trending`}
              className={`w-full px-3 py-1 hover:bg-primary hover:text-white rounded-lg`}
            >
              Trending
            </Link>
            <Link
              href={`/search`}
              className={`w-full px-3 py-1 hover:bg-primary hover:text-white rounded-lg`}
            >
              Search
            </Link>
            <button
              className={`w-full px-3 py-1 text-gray-900 dark:text-warmGray-100 hover:text-pink-500`}
              onClick={async (e) => {
                e.stopPropagation();
                await logout();
              }}
            >
              Logout
            </button>
            <button
              className={`self-end px-3 py-1 hover:bg-gray-200 hover:text-white`}
              onClick={() => {
                setDarkMode((prev) => !prev);
              }}
            >
              {darkMode ? (
                <SunIcon className={`w-6 h-6 text-yellow-300`} />
              ) : (
                <MoonIcon className={`w-6 h-6 text-blueGray-500`} />
              )}
            </button>
          </div>
        )}
        {isListClicked && !isLoading && !isLogin && (
          <div
            className={`fixed top-12 left-0 flex flex-col w-screen items-start gap-3 p-2 text-gray-900 dark:text-warmGray-100 text-sm whitespace-nowrap bg-white border border-gray-300 rounded `}
          >
            <button
              className={`w-full px-3 py-1 text-start hover:text-primary`}
              onClick={async () => {
                await login();
              }}
            >
              Sign up
            </button>
            <button
              className={`w-full px-3 py-1 text-start hover:text-primary`}
              onClick={async () => {
                await login();
              }}
            >
              Login
            </button>
            <Link
              href={`/discover`}
              className={`w-full px-3 py-1 hover:bg-primary hover:text-white rounded-lg`}
            >
              Discover
            </Link>
            <Link
              href={`/trending`}
              className={`w-full px-3 py-1 hover:bg-primary hover:text-white rounded-lg`}
            >
              Trending
            </Link>
            <Link
              href={`/search`}
              className={`w-full px-3 py-1 hover:bg-primary hover:text-white rounded-lg`}
            >
              Search
            </Link>
            <button
              className={`self-end px-3 py-1 hover:bg-gray-200 hover:text-white`}
              onClick={() => {
                setDarkMode((prev) => !prev);
              }}
            >
              {darkMode ? (
                <SunIcon className={`w-6 h-6 text-yellow-300`} />
              ) : (
                <MoonIcon className={`w-6 h-6 text-blueGray-500`} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderUser;
