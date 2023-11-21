import { useRecoilState } from "recoil";
import { PlaylistType } from "@/libs/types/song&playlistType";
import dayjs from "dayjs";
import {
  postPlaylistCount,
  postRecentPlayed,
} from "@/libs/utils/client/fetchers";
import { useMutation } from "react-query";
import { played5MinSeconds } from "@/libs/utils/client/commonValues";
import {
  isNowMoreThanTargetTime,
  setRecentPlaylistIdLocalStorage,
} from "@/libs/utils/client/commonUtils";
import { playerGlobalState, playlistState } from "@/libs/recoil/atoms";

const UseSelectedPlaylistPlay = (
  playlistData: PlaylistType,
  userId?: string,
) => {
  const [playerState, setPlayerState] = useRecoilState(playerGlobalState);
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(playlistState);
  const { playing, startedAt, currentSongListIndex } = playerState;

  const { mutate: postPlaylistPlayedTime } = useMutation({
    mutationFn: ({ id, time }: { id: string; time: number }) =>
      postPlaylistCount(id, time),
    onSuccess: () => {
      setPlayerState((prev) => ({ ...prev, startedAt: null }));
    },
  });

  const { mutate: mutateRecentPlayed } = useMutation({
    mutationFn: ({
      recentPlaylistId,
      curUserId,
    }: {
      recentPlaylistId: string;
      curUserId: string;
    }) => postRecentPlayed(curUserId, recentPlaylistId),
  });

  const handleRecentPlayed = () => {
    if (userId) {
      mutateRecentPlayed({
        curUserId: userId,
        recentPlaylistId: playlistData.id,
      });
    }
  };

  const handleChangePlaylistState = (playlist: PlaylistType) => {
    const now = dayjs();
    const isMoreThan5Mins = isNowMoreThanTargetTime(
      startedAt,
      played5MinSeconds,
      "seconds",
    );

    if (selectedPlaylist && selectedPlaylist.id === playlist.id) {
      setPlayerState((prev) => ({ ...playerState, playing: !prev.playing }));
      return;
    }

    if (!startedAt) {
      setPlayerState({ ...playerState, startedAt: now });
    }

    if (selectedPlaylist && isMoreThan5Mins) {
      postPlaylistPlayedTime({
        id: selectedPlaylist.id,
        time: now.diff(dayjs(startedAt), "seconds"),
      });
      handleRecentPlayed();
      setRecentPlaylistIdLocalStorage(selectedPlaylist.id);
    }

    setSelectedPlaylist(playlistData);
    setPlayerState((prev) => ({
      ...prev,
      playing: true,
      currentSongListIndex: 0,
    }));
  };

  return {
    handleChangePlaylistState,
    playing:
      selectedPlaylist && selectedPlaylist.id === playlistData.id && playing,
  };
};

export default UseSelectedPlaylistPlay;
