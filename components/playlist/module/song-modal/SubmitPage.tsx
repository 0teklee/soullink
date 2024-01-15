import React from "react";
import Title from "@/components/common/module/Title";
import { SONG_TYPE_OPTIONS } from "@/libs/utils/client/contants/commonValues";
import { SONG_URL_TYPE, SongType } from "@/libs/types/song&playlistType";

interface SubmitPageProps {
  urlType: string;
  setUrlType: React.Dispatch<React.SetStateAction<SONG_URL_TYPE>>;
  songValue: SongType;
  setSongValue: React.Dispatch<React.SetStateAction<SongType>>;
  handleAddSong: () => void;
  isAvailableCustomUrl: boolean;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const SubmitPage = ({
  urlType,
  setUrlType,
  songValue,
  setSongValue,
  handleAddSong,
  isAvailableCustomUrl,
  isDropdownOpen,
  setIsDropdownOpen,
  setPage,
}: SubmitPageProps) => {
  return (
    <>
      <Title size={`h2`} text={`Add Song`} />
      <div
        className={`relative flex items-center justify-between gap-0 ${
          urlType === "custom" && "mb-5"
        } `}
      >
        <div
          className={`flex items-center gap-3 p-3 border-y border-l border-gray-200 rounded-y rounded-l`}
        >
          <button
            className={`text-gray-500 dark:text-warmGray-50`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span className={`relative top-0.5  mr-2`}>⛛</span>
            <span>{urlType ? urlType : "from"}</span>
          </button>
        </div>
        {isDropdownOpen && (
          <div
            className={`absolute top-12 p-3 bg-white rounded border border-gray-300 z-10`}
          >
            {SONG_TYPE_OPTIONS.map((type, index) => (
              <button
                key={`${type}_${index}`}
                className={`w-full p-2 text-left hover:bg-gray-100`}
                onClick={() => {
                  setSongValue({
                    ...songValue,
                    url: "",
                    title: "",
                    artist: "",
                    thumbnail: "",
                  });
                  setUrlType(type);
                  setIsDropdownOpen(false);
                }}
              >
                {type}
              </button>
            ))}
          </div>
        )}
        <div
          className={`p-3 bg-white border-y border-r border-gray-200 rounded-y rounded-r focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
        >
          {!songValue.url && urlType !== "custom" && (
            <button
              onClick={() => {
                if (!urlType) {
                  setIsDropdownOpen(true);
                  return;
                }
                setPage("search");
              }}
              className={`text-gray-500 dark:text-warmGray-50 underline`}
            >
              {urlType
                ? `click to search from ${urlType}`
                : "click to select search type"}
            </button>
          )}
          {((songValue.url && urlType) || urlType === "custom") && (
            <input
              className={`bg-white`}
              type={`text`}
              placeholder={`url`}
              value={songValue.url}
              onChange={(e) => {
                setSongValue({ ...songValue, url: e.target.value });
              }}
            />
          )}
        </div>
        {urlType === "custom" && (
          <p
            className={`absolute top-12 pt-1 text-xs ${
              isAvailableCustomUrl ? `text-gray-400` : `text-pink-600`
            }`}
          >
            {isAvailableCustomUrl
              ? "Available URL : soundcloud, mixcloud, vimeo, facebook, twitch"
              : "Only available URL : soundcloud, mixcloud, vimeo, facebook, twitch"}
          </p>
        )}
      </div>
      <div className={`flex items-center justify-start gap-0 w-full`}>
        <div
          className={`flex justify-center w-16 p-3 border-y border-x border-gray-200 rounded-y rounded-l`}
        >
          Title
        </div>
        <div
          className={`p-3 bg-white border-y border-r border-gray-200 rounded-y rounded-r focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
        >
          <input
            className={`bg-white`}
            type={`text`}
            placeholder={`title`}
            value={songValue.title}
            onChange={(e) => {
              setSongValue({ ...songValue, title: e.target.value });
            }}
          />
        </div>
      </div>
      <div className={`flex items-center justify-start gap-0 w-full`}>
        <div
          className={`flex items-center w-16 p-3 border-y border-x border-gray-200 rounded-y rounded-l`}
        >
          Artist
        </div>
        <div
          className={`p-3 bg-white border-y border-r border-gray-200 rounded-y rounded-r focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
        >
          <input
            className={`bg-white`}
            type={`text`}
            placeholder={`artist`}
            value={songValue.artist}
            onChange={(e) => {
              setSongValue({ ...songValue, artist: e.target.value });
            }}
          />
        </div>
      </div>
      <button
        onClick={handleAddSong}
        className={`mt-4 px-3 py-2 text-primary border-2 border-primary rounded`}
      >
        Add to playlist
      </button>
    </>
  );
};

export default SubmitPage;
