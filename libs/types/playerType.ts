import { Dayjs } from "dayjs";

export interface PlayerType {
  playing: boolean;
  played: string;
  duration: string;
  playedSec: number;
  durationSec: number;
  volume: number;
  muted: boolean;
  seeking: boolean;
  isLoading: boolean;
  currentSongListIndex: number;
  startedAt: Dayjs | null;
  songStartedAt: Dayjs | null;
}
