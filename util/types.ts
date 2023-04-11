export type cardType = string | number;

export enum OutcomeOption {
  DEALER = "dealer",
  PLAYER = "player",
  PUSH = "push",
  // shouldn't reach this step, so this means there's a bug
  DEBUG = "debug",
}

export enum Action {
  HIT = "hit",
  STAND = "stand",
  DOUB = "double",
  SPLIT = "split",
  NONE = "none",
  SURR = "surrender",
}

export enum Status {
  BUST = "bust",
  STILL_PLAYING = "stillPlaying",
  BLACKJACK = "blackjack",
  STAYED = "stayed",
  SURRENDERED = "surrendered",
}
