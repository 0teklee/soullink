import React, { Dispatch, SetStateAction } from "react";
import Title from "@/components/common/module/Title";

const CommentDeleteModal = ({
  setIsModalOpen,
  mutate,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  mutate: () => void;
}) => {
  return (
    <div className={`flex flex-col gap-3`}>
      <Title size={`h3`} text={`Are you sure to delete your comment?`} />
      <div className="flex justify-end">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 ml-2 text-sm font-medium text-white bg-red-400 rounded-md hover:bg-red-600"
          onClick={() => {
            mutate();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CommentDeleteModal;
