"use client";

import React, { useState } from "react";
import Title from "@/components/common/module/Title";
import { handleImageUpload } from "@/libs/utils/client/ImageUpload";
import Image from "next/image";

const SignupTemplate = () => {
  const [payload, setPayload] = useState({
    profilePic: "",
    nickname: "",
    description: "",
    socialLinks: {
      website: "",
      instagram: "",
      twitter: "",
    },
  });

  const isSubmitDisabled =
    payload.nickname === "" && payload.description === "";

  const handlePayloadImgUpload = (imgUrl: string) => {
    setPayload((prev) => ({
      ...prev,
      coverImage: imgUrl,
    }));
  };

  return (
    <section className={`flex flex-col items-center gap-12 py-6 xl:px-24`}>
      <Title size={`h1`} text={`Sign up`} />
      <div className={`flex items-center gap-12 w-full xs:flex-col`}>
        <div className={`relative flex flex-col items-center gap-1`}>
          <div
            onClick={() => {
              handleImageUpload(handlePayloadImgUpload);
            }}
            className={`relative flex items-center justify-center w-[100px] h-[100px] bg-gray-100 border border-gray-300 rounded-xl cursor-pointer`}
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
            className={`absolute -bottom-5 text-gray-500 text-xs whitespace-nowrap`}
          >
            Add profile picture
          </p>
        </div>
        <div
          className={`flex flex-col items-start gap-1 w-full max-w-xs xs:max-w-xl`}
        >
          <p
            className={`text-gray-700 font-medium xs:text-xl xs:font-semibold`}
          >
            Username
          </p>
          <input
            type={`text`}
            className={`w-full p-2 text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            maxLength={20}
            placeholder={`@username`}
            value={payload.nickname}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                nickname: e.target.value,
              }));
            }}
          />
          <p className={`text-xs text-gray-500`}>
            {payload.nickname.length} / {20}
          </p>
        </div>
      </div>
      <div className={`flex flex-col items-start gap-2 w-full`}>
        <Title size={`h2`} text={`Description`} />
        <textarea
          className={`w-full max-w-4xl min-h-[100px] p-2 text-gray-500 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          maxLength={120}
          value={payload.description}
          onChange={(e) => {
            setPayload((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        />
        <p className={`text-xs text-gray-500`}>
          {payload.description.length} / {120}
        </p>
      </div>
      <div className={`flex flex-col items-start w-full gap-4`}>
        <div className={`flex items-center gap-2`}>
          <Title size={`h2`} text={`Social Links`} />
          <p className={`text-gray-400 text-sm font-medium`}>(Optional)</p>
        </div>
        <div className={`flex flex-col items-start gap-2 w-full max-w-sm`}>
          <p
            className={`text-sm text-gray-700 font-medium xs:text-xl xs:font-semibold`}
          >
            website
          </p>
          <input
            type={`text`}
            className={`w-full p-1.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
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
            className={`text-sm text-gray-700 font-medium xs:text-xl xs:font-semibold`}
          >
            instagram
          </p>
          <input
            type={`text`}
            className={`w-full p-1.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder={`instagram id`}
            value={payload.socialLinks.website}
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
            className={`text-sm text-gray-700 font-medium xs:text-xl xs:font-semibold`}
          >
            twitter
          </p>
          <input
            type={`text`}
            className={`w-full p-1.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder={`twitter id`}
            value={payload.socialLinks.website}
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
        className={`w-full max-w-[120px] p-2 text-sm text-white font-bold bg-primary rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Sign up
      </button>
    </section>
  );
};

export default SignupTemplate;
