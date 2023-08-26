import React from "react";
import { CommentType } from "@/types/common/userType";
import Image from "next/image";

const CommentItem = ({ commentProps }: { commentProps: CommentType }) => {
  const { comment, createdAt, author } = commentProps;
  const { nickname, profilePic } = author;
  return (
    <div
      className={`flex items-center justify-start gap-3 w-full px-2 py-2 border-b-[1px] border-gray-200 text-sm `}
    >
      <div className={`relative w-5 h-5`}>
        <Image
          className={`rounded-full`}
          src={profilePic}
          alt={`usr_${author.id}`}
          fill={true}
        />
      </div>{" "}
      <p className={`text-gray-900 font-medium`}>{nickname}</p>
      <p className={`text-gray-500 font-normal`}>{comment}</p>
    </div>
  );
};

export default CommentItem;
