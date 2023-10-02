"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  CommentPayloadType,
  UserSessionType,
} from "@/libs/types/common/userType";
import { useMutation } from "react-query";
import { postComment } from "@/libs/utils/client/fetchers";
import { useSetRecoilState } from "recoil";
import { CommonLoginModalState } from "@/libs/recoil/modalAtom";

const CommentInput = ({
  postId,
  refetch,
  isProfile,
}: {
  postId: string;
  refetch: () => void;
  isProfile?: boolean;
}) => {
  const setLoginModalOpen = useSetRecoilState(CommonLoginModalState);

  const { data: session } = useSession() as { data: UserSessionType };
  const userId = session?.userId;
  const isLoggedIn = !!userId;

  const [payload, setPayload] = useState<CommentPayloadType>({
    userId: userId || "",
    postId: postId || "",
    comment: "",
    isProfile,
    isPrivate: false,
  });

  const { comment, isPrivate } = payload;

  const { mutate: postCommentMutate } = useMutation({
    mutationFn: () => postComment(payload),
    onSuccess: () => {
      setPayload((prev) => ({ ...prev, comment: "", isPrivate: false }));
      refetch();
    },
    onError: (error) => {
      console.log(error);
      confirm("Error occured. Please try again.");
    },
  });

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPayload((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handlePostComment = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn || !payload.userId) {
      setLoginModalOpen(true);
      return;
    }

    if (!comment) {
      alert("please write comment");
      return;
    }

    postCommentMutate();
  };

  useEffect(() => {
    if (!session || !userId) {
      setPayload((prev) => ({ ...prev, userId: "" }));
      return;
    }
    setPayload((prev) => ({ ...prev, userId }));
  }, [session]);

  return (
    <div
      className={`flex flex-col items-start justify-center gap-3 w-full my-3 border-b border-dashed border-gray-300`}
    >
      <div className={`flex flex-col items-start justify-center gap-1 w-full`}>
        <div className={`relative w-full text-gray-700`}>
          <textarea
            className={`w-full ${
              comment.length > 0 ? "h-24" : "h-full"
            } p-2 bg-white border border-gray-300 hover:border-primary outline-none resize-none rounded`}
            onChange={handleTextareaChange}
            maxLength={200}
          />
          <div
            className={`absolute bottom-2.5 right-2 flex items-center gap-2 text-sm text-gray-700`}
          >
            <p>{payload.comment.length} / </p>
            <p>200</p>
          </div>
        </div>
        <div
          className={`flex items-center justify-between w-full text-sm text-gray-700 font-medium`}
        >
          <div className={`flex items-center justify-between gap-2`}>
            <input
              className={`w-4 h-4 appearance-none rounded border border-gray-300 bg-white checked:bg-primary checked:border-transparent focus:outline-none  `}
              type={`checkbox`}
              onChange={() => {
                setPayload((prev) => ({ ...prev, isPrivate: !prev.isPrivate }));
              }}
              checked={isPrivate}
            />
            <span className={``}>private</span>
          </div>
          <button
            className={`p-4 hover:text-primary`}
            onClick={handlePostComment}
            type={`submit`}
          >
            <span>post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
