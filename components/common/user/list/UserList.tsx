"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserType } from "@/libs/types/common/userType";

const UserList = ({ users }: { users: UserType[] }) => {
  const router = useRouter();
  return (
    <div className={`flex flex-col items-start w-full max-w-lg`}>
      {users.map((user, index) => (
        <div
          className={`flex items-center justify-between gap-3 w-full py-1 group border-b border-dotted border-b-gray-300 text-gray-700 cursor-pointer hover:bg-gray-100`}
          key={`${user.nickname}_${index}`}
          onClick={() => router.push(`/user/${user.nickname}`)}
        >
          <div className={`flex items-center gap-3`}>
            <div className={`relative w-12 h-12`}>
              <Image
                fill={true}
                className={`object-cover rounded-full`}
                src={user?.profilePic || `/images/common/default_profile.svg`}
                alt={`${user.nickname}_profile_pic`}
              />
            </div>
            <p className={`text-sm font-semibold group-hover:text-primary`}>
              {user.nickname}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
