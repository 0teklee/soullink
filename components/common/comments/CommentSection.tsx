import React, { Suspense } from "react";
import CommentInput from "@/components/common/comments/CommentInput";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import Loading from "@/components/common/module/Loading";
import CommentContainer from "@/components/common/comments/CommentContainer";

const CommentSection = ({
  postId,
  userId,
  isProfile,
}: {
  postId: string;
  userId?: string;
  isProfile?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col justify-start items-start w-full gap-y-3 px-4`}
    >
      <CommentInput postId={postId} isProfile={isProfile} />
      <ReactQueryErrorBoundary>
        <Suspense fallback={<Loading />}>
          <CommentContainer
            postId={postId}
            userId={userId}
            isProfile={isProfile}
          />
        </Suspense>
      </ReactQueryErrorBoundary>
    </div>
  );
};

export default CommentSection;
