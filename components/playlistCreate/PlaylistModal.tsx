import React, {
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import Title from "@/components/common/module/Title";
import { useQuery } from "react-query";
import {
  YoutubeItem,
  YoutubeSearchResponse,
} from "@/types/apiData/client/searchTypes";
import Image from "next/image";
import { CreateSongType } from "@/types/common/Song&PlaylistType";

type TUrlType = "youtube" | "custom" | "";

const PlaylistModal = ({
  setModalOpen,
  setSongList,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setSongList: Dispatch<SetStateAction<CreateSongType[]>>;
}) => {
  const [page, setPage] = useState("submit");

  const [songValue, setSongValue] = useState<CreateSongType>({
    url: "",
    type: "",
    title: "",
    artist: "",
    thumbnail: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isAvailableCustomUrl, setIsAvailableCustomUrl] =
    useState<boolean>(true);
  const [isYoutubeError, setIsYoutubeError] = useState<boolean>(false);

  const fetcherSearchYoutube = async (
    search: string,
  ): Promise<YoutubeItem[]> => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${search}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      );
      const data: YoutubeSearchResponse = await res.json();
      return data.items;
    } catch (err) {
      setIsYoutubeError(true);
      return [];
    }
  };

  const { data: youtubeData } = useQuery({
    queryKey: ["youtube", searchWord],
    queryFn: () => fetcherSearchYoutube(searchWord),
    enabled: isFetching,
  });

  const typeOptions: TUrlType[] = ["youtube", "custom"];
  const availCustomUrl = [
    "soundcloud",
    "mixcloud",
    "vimeo",
    "facebook",
    "twitch",
  ];

  const isCustomValid = (customUrl: string, availDomain: string[]) => {
    const urlRegex =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z0-9-]+)(\/[a-zA-Z0-9-]+)?$/;
    const splitUrl = customUrl.split(".");
    const isAvailDomain =
      splitUrl.filter(
        (url) =>
          availDomain.filter((availItem) => url.includes(availItem)).length > 0,
      ).length > 0;

    return isAvailDomain && urlRegex.test(customUrl);
  };

  const isUrlValid = isCustomValid(songValue.url, availCustomUrl);

  const handleCoverImageUpload = () => {
    // imageUploader.image().
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    startTransition(() => setSearchWord(e.target.value));
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    setSearchTimer(
      setTimeout(() => {
        setIsFetching(true);
      }, 800),
    );
    setIsFetching(false);
  };

  return (
    <>
      <div
        onClick={(e) => {
          setModalOpen(false);
        }}
        className={`fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-30 text-gray-900`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`flex flex-col items-center justify-center gap-4 p-5 xs:p-2 bg-white rounded border border-gray-300`}
        >
          {page === "submit" && (
            <>
              <Title size={`h2`} text={`Add Song`} />
              <div
                className={`relative flex items-center justify-between gap-0 ${
                  songValue.type === "custom" && "mb-5"
                } `}
              >
                <div
                  className={`flex items-center gap-3 p-3 border-y border-l border-gray-200 rounded-y rounded-l`}
                >
                  <button
                    className={`text-gray-500`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className={`relative top-0.5  mr-2`}>⛛</span>
                    <span>{songValue.type ? songValue.type : "from"}</span>
                  </button>
                </div>
                {isDropdownOpen && (
                  <div
                    className={`absolute top-12 p-3 bg-white rounded border border-gray-300 z-10`}
                  >
                    {typeOptions.map((type, index) => (
                      <button
                        key={index}
                        className={`w-full p-2 text-left hover:bg-gray-100`}
                        onClick={() => {
                          setSongValue({
                            url: "",
                            title: "",
                            artist: "",
                            type: type,
                            thumbnail: "",
                          });
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
                  {!songValue.url && songValue.type !== "custom" && (
                    <button
                      onClick={() => {
                        if (!songValue.type) {
                          setIsDropdownOpen(true);
                          return;
                        }
                        setPage("search");
                      }}
                      className={`text-gray-500 underline`}
                    >
                      {songValue.type
                        ? `click to search from ${songValue.type}`
                        : "click to select search type"}
                    </button>
                  )}
                  {((songValue.url && songValue.type) ||
                    songValue.type === "custom") && (
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
                {songValue.type === "custom" && (
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
                onClick={() => {
                  if (!isUrlValid) {
                    setIsAvailableCustomUrl(false);
                    return;
                  }

                  if (songValue.title === "" || songValue.artist === "") {
                    alert("Please fill the title and artist");
                    return;
                  }

                  setSongList((prev) => [...prev, songValue]);
                  setSongValue({
                    url: "",
                    title: "",
                    artist: "",
                    type: "",
                    thumbnail: "",
                  });
                  setModalOpen(false);
                }}
                className={`mt-4 px-3 py-2 text-primary border-2 border-primary rounded`}
              >
                Add to playlist
              </button>
            </>
          )}
          {page === "search" && (
            <>
              <Title size={`h2`} text={`Search song`} />
              <input
                className={`w-full p-2 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder={`search on ${songValue.type}`}
                type={`text`}
                value={searchWord}
                onChange={handleSearch}
              />
              <div
                className={`flex flex-col items-start gap-2 max-h-[300px] overflow-y-scroll`}
              >
                {songValue.type === "youtube" &&
                  youtubeData &&
                  youtubeData.length > 0 &&
                  youtubeData.map((item, index) => (
                    <button
                      key={index}
                      className={`flex items-center justify-start gap-2 w-full p-2 bg-white hover:bg-primary hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                      onClick={() => {
                        setSongValue((prev) => ({
                          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                          title: item.snippet.title,
                          artist: item.snippet.channelTitle.replace("VEVO", ""),
                          thumbnail: item.snippet.thumbnails.default.url,
                          type: "youtube",
                        }));
                        setPage("submit");
                      }}
                    >
                      <div className={`relative w-16 h-16 rounded`}>
                        <Image
                          className={`object-cover w-16 h-16`}
                          fill={true}
                          src={item.snippet.thumbnails.default.url}
                          alt={item.snippet.title}
                          unoptimized={true}
                        />
                      </div>
                      <div
                        className={`flex flex-col items-start justify-center gap-1`}
                      >
                        <div className={`text-sm font-bold`}>
                          {item.snippet.title}
                        </div>
                        <div className={`text-xs`}>
                          {item.snippet.channelTitle.replace("VEVO", "")}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
              {isYoutubeError && (
                <div
                  className={`flex flex-col items-center justify-center w-full p-2 text-sm text-gray-500`}
                >
                  <p className={`text-sm text-pink-600`}>
                    Youtube Api Error Occurred. Please try later.
                  </p>
                  <button
                    className={`px-3 py-2 bg-pink-600 text-lg text-white font-semibold rounded`}
                  >
                    Go back
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PlaylistModal;
