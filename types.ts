export type cardType = string | number;

export enum Action {
  HIT = "hit",
  STAND = "stand",
  DOUB = "double",
  SPLIT = "split",
  NONE = "none",
}

export enum Status {
  BUST = "bust",
  STILL_PLAYING = "stillPlaying",
  BLACKJACK = "blackjack",
  STAYED = "stayed",
}
