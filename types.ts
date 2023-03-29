export type cardType = string | number;

export enum Action {
  HIT = "HIT",
  STAND = "STAND",
  DOUB = "DOUB",
  SPLIT = "SPLIT",
  NONE = "NONE",
}

export enum Result {
  WIN = "WIN",
  BUST = "BUST",
  PUSH = "PUSH",
  STILL_PLAYING = "STILL_PLAYING",
  BLACKJACK = "BLACKJACK",
}
