import { ReactPlayerProps } from "react-player";

export interface PlayerProps extends ReactPlayerProps {
  seekTo(amount: number, type?: "seconds" | "fraction"): void;
  getCurrentTime(): number;
  getSecondsLoaded(): number;
  getDuration(): number;
  getInternalPlayer(key?: string): Record<string, any>;
  showPreview(): void;
}

export interface PlayerState {
  playing: boolean;
  played: string;
  duration: string;
  playedSec: number;
  durationSec: number;
  volume: number;
  muted: boolean;
  seeking: boolean;
}
