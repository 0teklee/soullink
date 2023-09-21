import React from "react";
import { CommentType } from "@/types/common/userType";
import CommentItem from "@/components/common/comments/CommentItem";

const CommentContainer = ({ commentList }: { commentList: CommentType[] }) => {
  return (
    <div className={`flex flex-col justify-start items-start w-full gap-y-3`}>
      {commentList ? (
        commentList.map((comment: CommentType, index) => (
          <CommentItem
            commentProps={comment}
            key={`comment_${comment.id}_${index}`}
          />
        ))
      ) : (
        <p className={`text-gray-300 text-lg font-normal`}>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentContainer;
