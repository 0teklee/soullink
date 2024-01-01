"use client";

import React, { useEffect, useReducer } from "react";
import Title from "@/components/common/module/Title";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { SignupPayload, UserSessionType } from "@/libs/types/userType";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { handleImageUpload } from "@/libs/utils/client/commonUtils";

import {
  fetcherSignup,
  postNicknameDuplicate,
} from "@/libs/utils/client/fetchers";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useTimer from "@/libs/utils/hooks/useTimer";
import Loading from "@/components/common/module/Loading";
import { payloadReducer } from "@/components/signup/utils";

const SignupTemplate = () => {
  const { data: session } = useSession() as { data: UserSessionType };
  const userEmail = session?.user?.email;
  const router = useRouter();

  const [payloadState, dispatch] = useReducer(payloadReducer, {
    payload: {
      profilePic: "",
      nickname: "",
      bio: "",
      email: userEmail || "",
      socialLinks: { website: "", instagram: "", twitter: "" },
    },
    isDuplicated: null,
  });

  const isDuplicated = payloadState?.isDuplicated;
  const isOAuthSignIn = !!session?.user?.email && !!payloadState?.payload.email;

  const isSubmitDisabled =
    !payloadState?.payload.email ||
    payloadState?.payload.nickname === "" ||
    payloadState?.payload.bio === "" ||
    !!payloadState?.isDuplicated;

  const { mutate } = useMutation({
    mutationFn: (signUp: SignupPayload) => fetcherSignup(signUp),
    onSuccess: () => {
      router.push(`/`);
      window.location.reload();
    },
  });

  const { mutate: nicknameDuplicateMutate, isPending: isDuplicateLoading } =
    useMutation({
      mutationFn: ({ nickname }: { nickname: string }) =>
        postNicknameDuplicate({ nickname }),
      onSuccess: (res) => {
        dispatch({ type: "SET_IS_DUPLICATED", isDuplicated: res });
      },
    });

  const { timer, resetTimer } = useTimer(() => {
    if (!payloadState?.payload.nickname) {
      return;
    }
    nicknameDuplicateMutate({ nickname: payloadState?.payload.nickname });
  }, 800);

  const handleSignup = (arrPayload: SignupPayload) => {
    const formattedPayload = {
      ...arrPayload,
      nickname: arrPayload?.nickname.trim(),
      bio: arrPayload?.bio.trim(),
      socialLinks: {
        ...arrPayload?.socialLinks,
        website:
          !!arrPayload?.socialLinks.website ||
          !arrPayload?.socialLinks.website.startsWith("http")
            ? `https://${arrPayload?.socialLinks.website}`
            : "",
        instagram: arrPayload?.socialLinks.instagram
          ? `https://www.instagram.com/${arrPayload?.socialLinks.instagram}`
          : "",
        twitter: arrPayload?.socialLinks.twitter
          ? `https://x.com/${arrPayload?.socialLinks.twitter}`
          : "",
      },
    };
    mutate(formattedPayload);
  };

  const handlePayloadImgUpload = (imgUrl: string) => {
    dispatch({ type: "SET_PAYLOAD", payload: { profilePic: imgUrl } });
  };

  useEffect(() => {
    if (!payloadState?.payload.nickname) {
      dispatch({ type: "SET_IS_DUPLICATED", isDuplicated: null });
    }
  }, [payloadState?.payload.nickname]);

  useEffect(() => {
    if (!!session && !!session?.userId) {
      router.push(`/`);
    }

    if (!userEmail) {
      return;
    }
    dispatch({ type: "SET_PAYLOAD", payload: { email: userEmail } });
  }, [session, userEmail]);

  return (
    <section
      className={`flex flex-col items-center gap-12 py-6 xs:px-3 xs:overflow-y-scroll xs:gap-6 dark:bg-gray-600 xs:h-screen xs:pt-6 xs:pb-24`}
    >
      <Title size={`h1`} text={`Sign up`} />
      <div className={`flex flex-col items-start gap-12 w-full max-w-lg `}>
        <div
          className={`relative flex self-center flex-col items-center gap-1`}
        >
          <div
            onClick={() => {
              handleImageUpload(handlePayloadImgUpload);
            }}
            className={`relative flex items-center justify-center w-[200px] h-[200px] bg-gray-100 border border-gray-300 rounded-xl cursor-pointer`}
          >
            {!payloadState?.payload.profilePic && (
              <Image
                src={`/image/common/plus.svg`}
                width={36}
                height={36}
                alt={`add cover`}
              />
            )}
            {payloadState?.payload.profilePic && (
              <Image
                className={`object-cover`}
                src={`${payloadState?.payload.profilePic}`}
                fill={true}
                alt={`add cover`}
              />
            )}
          </div>
          <p
            className={`absolute -bottom-5 text-gray-500 dark:text-warmGray-50 text-xs whitespace-nowrap`}
          >
            Add profile picture
          </p>
        </div>
        <div className={`flex flex-col items-start gap-3 w-full xs:max-w-xl`}>
          <div className={`flex flex-col items-start gap-1 w-full`}>
            <p
              className={`text-gray-700 dark:text-warmGray-50 font-medium xs:text-xl xs:font-semibold`}
            >
              Email
            </p>
            <p className={`text-xs text-gray-400 font-semibold`}>*required</p>
            <input
              type={`text`}
              className={`w-full p-2 text-gray-500 dark:text-warmGray-50 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              maxLength={20}
              placeholder={`email`}
              value={payloadState?.payload.email}
              disabled={true}
            />
            <button
              onClick={async () => {
                await signIn("google", {
                  redirect: true,
                });
              }}
              disabled={isOAuthSignIn}
              className={`self-end px-2 py-1 text-xs text-blue-400 border border-blue-400 hover:text-white hover:bg-blue-500 rounded  disabled:cursor-default disabled:text-white disabled:bg-blue-500`}
            >
              {isOAuthSignIn ? "Authenticated" : "Authenticate with Google"}
            </button>
          </div>
          <div className={`flex flex-col items-start gap-1 w-full `}>
            <p
              className={`text-gray-700 dark:text-warmGray-50 font-medium xs:text-xl xs:font-semibold`}
            >
              Nickname
            </p>
            <p className={`text-xs text-gray-300`}>*required</p>
            <input
              type={`text`}
              className={`w-full p-2 text-gray-500 dark:text-warmGray-50 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              maxLength={20}
              placeholder={`@nickname`}
              value={payloadState?.payload.nickname}
              onChange={(e) => {
                if (e.currentTarget.value === " ") {
                  return;
                }
                dispatch({
                  type: "SET_PAYLOAD",
                  payload: { nickname: e.target.value },
                });
              }}
              onKeyUp={() => {
                resetTimer(timer);
              }}
            />
            <p className={`text-xs text-gray-500 dark:text-warmGray-50`}>
              {payloadState?.payload.nickname.length} / {20}
            </p>
            {!isDuplicateLoading && isDuplicated !== null && (
              <div className={`w-full mt-0.5`}>
                {isDuplicated && (
                  <div className={`flex items-center gap-1 text-pink-700`}>
                    <XMarkIcon className={`w-4 h-4`} />
                    <p className={`text-xs`}>nickname already used</p>
                  </div>
                )}
                {isDuplicated === false && (
                  <div className={`flex items-center gap-1 text-primary`}>
                    <CheckIcon className={`w-4 h-4`} />
                    <p className={`text-xs`}>available</p>
                  </div>
                )}
              </div>
            )}
            {isDuplicateLoading &&
              payloadState?.payload.nickname.length > 0 && (
                <div
                  className={`flex items-center justify-start gap-2 whitespace-nowrap`}
                >
                  <p className={`text-xs text-gray-500 dark:text-warmGray-50`}>
                    checking...
                  </p>
                  <Loading size={20} />
                </div>
              )}
          </div>
        </div>
      </div>
      <div className={`flex flex-col items-start gap-2 w-full  max-w-lg`}>
        <Title size={`h2`} text={`Bio`} />
        <p className={`text-xs text-gray-300`}>*required</p>
        <textarea
          className={`w-full max-w-4xl min-h-[100px] p-2 text-gray-500 dark:text-warmGray-50 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          maxLength={120}
          value={payloadState?.payload.bio}
          onChange={(e) => {
            dispatch({ type: "SET_PAYLOAD", payload: { bio: e.target.value } });
          }}
        />
        <p className={`text-xs text-gray-500 dark:text-warmGray-50`}>
          {payloadState?.payload.bio.length} / {120}
        </p>
      </div>
      <div
        className={`flex flex-col items-start w-full max-w-lg gap-4 xs:gap-1`}
      >
        <div className={`flex items-center gap-2`}>
          <Title size={`h2`} text={`Social Links`} />
          <p className={`text-gray-400 text-sm font-medium`}>(Optional)</p>
        </div>
        <div className={`flex flex-col items-start gap-2 w-full max-w-sm`}>
          <p
            className={`text-sm text-gray-700 dark:text-warmGray-50 font-medium xs:text-xl xs:font-semibold`}
          >
            website
          </p>
          <input
            type={`text`}
            className={`w-full p-1.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder={`https://example.com`}
            value={payloadState?.payload.socialLinks.website}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_SOCIAL_LINKS",
                payload: {
                  website: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className={`flex flex-col items-start gap-2 w-full max-w-sm`}>
          <p
            className={`text-sm text-gray-700 dark:text-warmGray-50 font-medium xs:text-xl xs:font-semibold`}
          >
            instagram
          </p>
          <input
            type={`text`}
            className={`w-full p-1.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder={`instagram id`}
            value={payloadState?.payload.socialLinks.instagram}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_SOCIAL_LINKS",
                payload: {
                  instagram: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className={`flex flex-col items-start gap-2 w-full max-w-sm`}>
          <p
            className={`text-sm text-gray-700  font-medium xs:text-xl xs:font-semibold`}
          >
            twitter
          </p>
          <input
            type={`text`}
            className={`w-full p-1.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder={`twitter id`}
            value={payloadState?.payload.socialLinks.twitter}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_SOCIAL_LINKS",
                payload: {
                  twitter: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>
      <button
        disabled={isSubmitDisabled}
        className={`w-full max-w-xs my-4 px-2 py-3 text-sm text-white font-bold bg-primary rounded-md disabled:opacity-50 disabled:cursor-not-allowed xs:my-1`}
        onClick={() => {
          if (!isOAuthSignIn || !payloadState?.payload.email) {
            alert(`Please sign in with Google`);
            return;
          }
          handleSignup(payloadState?.payload);
        }}
      >
        Sign up
      </button>
    </section>
  );
};

export default SignupTemplate;
