"use client";

import React, { useEffect } from "react";
import Title from "@/components/common/module/Title";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { SignupInputValidate, UserSessionType } from "@/libs/types/userType";
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
import { useForm } from "react-hook-form";

const SignupTemplate = () => {
  const { data: session } = useSession() as { data: UserSessionType };
  const userEmail = session?.user?.email;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm<SignupInputValidate>({
    defaultValues: {
      email: userEmail || "",
      nickname: "",
      bio: "",
      socialLinks: { website: "", instagram: "", twitter: "" },
      isDuplicate: null,
      profilePic: "",
    },
  });

  const emailValue = watch("email");
  const nicknameValue = watch("nickname");
  const profilePicValue = watch("profilePic");
  const bioValue = watch("bio");
  const isDuplicateValue = watch("isDuplicate");
  const socialLinksValue = watch("socialLinks");
  const { website, instagram, twitter } = socialLinksValue;

  const isOAuthSignIn = !!session?.user?.email && !!emailValue;

  const { mutate } = useMutation({
    mutationFn: ({ isDuplicate, ...payload }: SignupInputValidate) =>
      fetcherSignup(payload),
    onSuccess: async () => {
      router.push(`/`);
      window.location.reload();
    },
  });

  const { mutate: nicknameDuplicateMutate, isPending: isDuplicateLoading } =
    useMutation({
      mutationFn: ({ nickname }: { nickname: string }) =>
        postNicknameDuplicate({ nickname }),
      onSuccess: (res) => {
        if (res) {
          setError("isDuplicate", { message: "nickname already used" });
        }

        if (!res) {
          clearErrors("isDuplicate");
        }

        setValue("isDuplicate", res);
      },
    });

  const isSubmitDisabled =
    !emailValue ||
    !nicknameValue ||
    !bioValue ||
    isDuplicateValue ||
    isDuplicateLoading ||
    !!errors?.nickname ||
    !!errors?.bio ||
    !!errors.isDuplicate ||
    !isOAuthSignIn;

  const { timer, resetTimer } = useTimer(() => {
    if (!nicknameValue) {
      return;
    }
    setValue("nickname", nicknameValue.trim());
    nicknameDuplicateMutate({ nickname: nicknameValue });
  }, 800);

  const handleSignup = (formData: SignupInputValidate) => {
    mutate(formData);
  };

  const handlePayloadImgUpload = (imgUrl: string) => {
    setValue("profilePic", imgUrl);
  };

  useEffect(() => {
    if (!!session && !!session?.userId) {
      router.push(`/`);
    }

    if (!userEmail) {
      return;
    }
    setValue("email", userEmail);
  }, [session, userEmail]);

  return (
    <section
      className={`flex flex-col items-center gap-12 py-6 xs:px-3 xs:overflow-y-scroll xs:gap-6 dark:bg-black xs:h-screen xs:pt-6 xs:pb-24`}
    >
      <Title size={`h1`} text={`Sign up`} />
      <form
        onSubmit={handleSubmit(handleSignup)}
        className={`flex flex-col items-center w-full`}
      >
        <div className={`flex flex-col items-start gap-12 w-full max-w-lg `}>
          <div
            className={`relative flex self-center flex-col items-center gap-1`}
          >
            <div
              onClick={() => {
                handleImageUpload(handlePayloadImgUpload);
              }}
              className={`relative flex items-center justify-center w-[200px] h-[200px] bg-gray-100 border border-gray-300 rounded-xl overflow-hidden cursor-pointer`}
            >
              {!profilePicValue && (
                <Image
                  src={`/image/common/plus.svg`}
                  width={36}
                  height={36}
                  alt={`add cover`}
                />
              )}
              {profilePicValue && (
                <Image
                  className={`object-cover`}
                  src={`${profilePicValue}`}
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
                value={emailValue}
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
                {...register("nickname", {
                  required: "nickname is required",
                  minLength: 2,
                  maxLength: 20,
                  onChange: (event) => {
                    if (!event.target.value) {
                      setValue("isDuplicate", null);
                      return;
                    }
                    return event.target.value;
                  },
                })}
                className={`w-full p-2 text-gray-500 dark:text-warmGray-50 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                maxLength={20}
                placeholder={`@nickname`}
                value={nicknameValue}
                onKeyUp={() => {
                  resetTimer(timer);
                }}
              />
              <p className={`text-xs text-gray-500 dark:text-warmGray-50`}>
                {nicknameValue.length} / {20}
              </p>
              {!isDuplicateLoading && isDuplicateValue !== null && (
                <div className={`w-full mt-0.5`}>
                  {isDuplicateValue && (
                    <div className={`flex items-center gap-1 text-pink-700`}>
                      <XMarkIcon className={`w-4 h-4`} />
                      <p className={`text-xs`}>{errors.isDuplicate?.message}</p>
                    </div>
                  )}
                  {isDuplicateValue === false && (
                    <div className={`flex items-center gap-1 text-primary`}>
                      <CheckIcon className={`w-4 h-4`} />
                      <p className={`text-xs`}>available</p>
                    </div>
                  )}
                </div>
              )}
              {isDuplicateLoading && nicknameValue.length > 2 && (
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
            placeholder={`Tell us about yourself`}
            {...register("bio", {
              required: true,
              minLength: 1,
              maxLength: 120,
            })}
          />
          <p className={`text-xs text-gray-500 dark:text-warmGray-50`}>
            {bioValue.length} / {120}
          </p>
          {errors.bio && (
            <p className={`text-xs text-pink-700`}>{errors.bio.message}</p>
          )}
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
              value={website}
              {...register("socialLinks.website", {
                required: false,
              })}
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
              value={instagram}
              {...register("socialLinks.instagram", {
                required: false,
              })}
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
              className={`w-full p-1.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              placeholder={`twitter id`}
              value={twitter}
              {...register("socialLinks.twitter", {
                required: false,
              })}
            />
          </div>
        </div>
        <button
          type={`submit`}
          className={`w-full max-w-xs mt-12 mb-4 px-2 py-3 text-sm text-white font-bold bg-primary rounded-md disabled:opacity-50 disabled:cursor-not-allowed xs:my-1`}
          disabled={isSubmitDisabled}
        >
          Sign up
        </button>
      </form>
    </section>
  );
};

export default SignupTemplate;
