"use client";

import React, { useEffect, useState } from "react";
import Title from "@/components/common/module/Title";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { SignupPayload } from "@/libs/types/userType";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { handleImageUpload } from "@/libs/utils/client/commonUtils";

const SignupTemplate = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const router = useRouter();

  const [payload, setPayload] = useState<SignupPayload>({
    profilePic: "",
    nickname: "",
    bio: "",
    email: userEmail || "",
    socialLinks: {
      website: "",
      instagram: "",
      twitter: "",
    },
  });

  const isOAuthSignIn = status === "authenticated" && !!payload.email;

  const isSubmitDisabled =
    !payload.email || payload.nickname === "" || payload.bio === "";

  const fetcherSignup = async (reqPayload: SignupPayload) => {
    const data = await fetch(`/api/user/signup`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqPayload),
    }).then((res) => res.json());
    return data;
  };

  const { mutate } = useMutation({
    mutationFn: fetcherSignup,
    onSuccess: () => {
      router.push(`/`);
    },
  });

  const handleSignup = (arrPayload: SignupPayload) => {
    mutate(arrPayload);
  };

  const handlePayloadImgUpload = (imgUrl: string) => {
    setPayload((prev) => ({
      ...prev,
      profilePic: imgUrl,
    }));
  };

  useEffect(() => {
    if (!userEmail) {
      return;
    }
    setPayload((prev) => ({
      ...prev,
      email: userEmail || "",
    }));
  }, [session]);

  return (
    <section className={`flex flex-col items-center gap-12 py-6 xs:px-3`}>
      <Title size={`h1`} text={`Sign up`} />
      <div className={`flex flex-col items-start gap-12 w-full max-w-lg`}>
        <div
          className={`relative flex self-center flex-col items-center gap-1`}
        >
          <div
            onClick={() => {
              handleImageUpload(handlePayloadImgUpload);
            }}
            className={`relative flex items-center justify-center w-[200px] h-[200px] bg-gray-100 border border-gray-300 rounded-xl cursor-pointer`}
          >
            {!payload.profilePic && (
              <Image
                src={`/image/common/plus.svg`}
                width={36}
                height={36}
                alt={`add cover`}
              />
            )}
            {payload.profilePic && (
              <Image
                className={`object-cover`}
                src={`${payload.profilePic}`}
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
            <input
              type={`text`}
              className={`w-full p-2 text-gray-500 dark:text-warmGray-50 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              maxLength={20}
              placeholder={`email`}
              value={payload.email}
              disabled={true}
            />
            <button
              onClick={async () => {
                await signIn("google", {
                  redirect: true,
                  callbackUrl: `/signup`,
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
            <input
              type={`text`}
              className={`w-full p-2 text-gray-500 dark:text-warmGray-50 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              maxLength={20}
              placeholder={`@nickname`}
              value={payload.nickname}
              onChange={(e) => {
                setPayload((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }));
              }}
            />
            <p className={`text-xs text-gray-500 dark:text-warmGray-50`}>
              {payload.nickname.length} / {20}
            </p>
          </div>
        </div>
      </div>
      <div className={`flex flex-col items-start gap-2 w-full  max-w-lg`}>
        <Title size={`h2`} text={`Bio`} />
        <textarea
          className={`w-full max-w-4xl min-h-[100px] p-2 text-gray-500 dark:text-warmGray-50 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          maxLength={120}
          value={payload.bio}
          onChange={(e) => {
            setPayload((prev) => ({
              ...prev,
              bio: e.target.value,
            }));
          }}
        />
        <p className={`text-xs text-gray-500 dark:text-warmGray-50`}>
          {payload.bio.length} / {120}
        </p>
      </div>
      <div className={`flex flex-col items-start w-full max-w-lg gap-4`}>
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
            className={`w-full p-1.5 text-sm text-gray-500 dark:text-warmGray-50 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder={`https://example.com`}
            value={payload.socialLinks.website}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                socialLinks: {
                  ...prev.socialLinks,
                  website: e.target.value,
                },
              }));
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
            className={`w-full p-1.5 text-sm text-gray-500 dark:text-warmGray-50 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder={`instagram id`}
            value={payload.socialLinks.instagram}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                socialLinks: {
                  ...prev.socialLinks,
                  instagram: e.target.value,
                },
              }));
            }}
          />
        </div>
        <div className={`flex flex-col items-start gap-2 w-full max-w-sm`}>
          <p
            className={`text-sm text-gray-700 dark:text-warmGray-50 font-medium xs:text-xl xs:font-semibold`}
          >
            twitter
          </p>
          <input
            type={`text`}
            className={`w-full p-1.5 text-sm text-gray-500 dark:text-warmGray-50 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder={`twitter id`}
            value={payload.socialLinks.twitter}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                socialLinks: {
                  ...prev.socialLinks,
                  twitter: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <button
        disabled={isSubmitDisabled}
        className={`w-full max-w-xs my-4 px-2 py-3 text-sm text-white font-bold bg-primary rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={() => {
          if (!isOAuthSignIn || !payload.email) {
            alert(`Please sign in with Google`);
            return;
          }
          handleSignup(payload);
        }}
      >
        Sign up
      </button>
    </section>
  );
};

export default SignupTemplate;
