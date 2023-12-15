"use client";

import React, { RefObject, useCallback, useRef, useState } from "react";
import Image from "next/image";

import { downloadPlaylistPng } from "@/libs/utils/client/commonUtils";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE, UseModalStateMap } from "@/libs/types/modalType";
import { PencilIcon } from "@heroicons/react/24/solid";
import ColorPicker from "@/components/common/module/ColorPicker";

const ShareDownloadModal = () => {
  const { useModalState, setModalOpenState } = useSetModal();
  const [shareDownloadState] = useModalState<
    UseModalStateMap[MODAL_TYPE.PLAYLIST_DOWNLOAD]
  >(MODAL_TYPE.PLAYLIST_DOWNLOAD);

  const { title, author, coverImage, songs, bgColor, fontColor } =
    shareDownloadState || {};

  const downloadRef = useRef<HTMLDivElement>(null);

  const [checkBoxes, setCheckBoxes] = useState({
    title: true,
    author: true,
    songs: true,
  });
  const [customText, setCustomText] = useState("");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [customFontColor, setCustomFontColor] = useState(
    fontColor ? fontColor : "",
  );

  const cover = coverImage || `/image/common/default_cover_image.svg`;

  const downloadPng = useCallback(
    async (imgName: string, targetRef: RefObject<HTMLElement>) =>
      downloadPlaylistPng(imgName, targetRef, setModalOpenState),
    [title, downloadRef],
  );

  return (
    <div className={`flex flex-col gap-3 items-center bg-white`}>
      <h3 className={`text-xl text-gray-700 font-semibold`}>
        Share Playlist Cover
      </h3>
      <div className={`relative w-96 h-96`} ref={downloadRef}>
        <Image src={cover} alt={`cover_image`} fill={true} />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3`}
          style={{
            color: customFontColor,
          }}
        >
          <div className={`flex flex-col items-center gap-2`}>
            {checkBoxes.title && (
              <p className={`text-2xl font-semibold`}>{title}</p>
            )}
            {!checkBoxes.title && customText && (
              <p className={`text-2xl font-semibold`}>{customText}</p>
            )}
            {checkBoxes.author && (
              <p className={`text-lg font-medium`}>by {author?.nickname}</p>
            )}
            {checkBoxes.songs && (
              <div className={`flex flex-col items-center gap-1`}>
                {songs &&
                  songs?.map((song, index) => {
                    if (index > 8) {
                      return;
                    }
                    return (
                      <div
                        className={`flex w-full items-center gap-1 text-sm overflow-ellipsis line-clamp-1`}
                        key={song.id}
                      >
                        <p>{index + 1}.</p>
                        <p key={`song_${index}`} className={`font-normal`}>
                          {song.title}
                        </p>
                      </div>
                    );
                  })}
                {songs && songs?.length >= 9 && (
                  <p className={`text-sm font-normal`}>and more...</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`relative flex items-center justify-center gap-3 text-gray-700`}
      >
        <div className={`flex items-center justify-between gap-2`}>
          <input
            className={`w-4 h-4 appearance-none rounded border border-gray-300 bg-white checked:bg-primary checked:border-transparent focus:outline-none `}
            type={`checkbox`}
            onChange={() => {
              setCheckBoxes((prev) => ({
                ...prev,
                title: !prev.title,
              }));
            }}
            checked={checkBoxes.title}
          />
          <span>Title</span>
        </div>
        <div className={`flex items-center justify-between gap-2`}>
          <input
            className={`w-4 h-4 appearance-none rounded border border-gray-300 bg-white checked:bg-primary checked:border-transparent focus:outline-none  `}
            type={`checkbox`}
            onChange={() => {
              setCheckBoxes((prev) => ({
                ...prev,
                songs: !prev.songs,
              }));
            }}
            checked={checkBoxes.songs}
          />
          <span>Songs</span>
        </div>
        <div
          className={`flex items-center justify-between gap-2 text-gray-700`}
        >
          <input
            className={`w-4 h-4 appearance-none rounded border border-gray-300 bg-white checked:bg-primary checked:border-transparent focus:outline-none  `}
            type={`checkbox`}
            onChange={() => {
              setCheckBoxes((prev) => ({
                ...prev,
                author: !prev.author,
              }));
            }}
            checked={checkBoxes.author}
          />
          <span>Author</span>
        </div>
      </div>
      <div className={`flex flex-col gap-2 items-center text-gray-700`}>
        {!checkBoxes.title && (
          <input
            className={`appearance-none pl-1 py-2 rounded border border-gray-300 bg-white checked:bg-primary checked:border-transparent focus:outline-none  `}
            type={`text`}
            value={customText}
            onChange={(e) => {
              setCustomText(e.target.value);
            }}
            maxLength={20}
          />
        )}
        <div className={`relative flex items-center justify-between gap-2`}>
          <input
            className={`w-4 h-4 appearance-none rounded border border-gray-300 bg-white checked:bg-primary checked:border-transparent focus:outline-none  `}
            type={`checkbox`}
            onChange={() => {
              setCheckBoxes((prev) => ({
                ...prev,
                title: false,
              }));
            }}
            checked={!checkBoxes.title}
          />
          <span>Custom Text</span>
        </div>
        <button
          className={`flex items-center justify-between gap-2`}
          onClick={() => {
            setIsColorPickerOpen((prev) => !prev);
          }}
        >
          <PencilIcon className={`w-5 h-5text-gray-900`} />
          <span className={`text-sm`}>Change font color</span>
        </button>
        {isColorPickerOpen && (
          <ColorPicker
            customFontColor={customFontColor}
            setCustomFontColor={setCustomFontColor}
            setIsColorPickerOpen={setIsColorPickerOpen}
          />
        )}
      </div>
      <div>
        <button
          className={`px-6 py-2 text-sm text-white bg-primary rounded-md`}
          onClick={() => {
            if (!title || !downloadRef) {
              return;
            }
            downloadPng(
              `${title}  ${author?.nickname ? `by ${author.nickname}` : ""}`,
              downloadRef,
            );
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ShareDownloadModal;
