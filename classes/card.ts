import { cardType } from "../util/types";

export class Card {
  text: cardType;
  value: number;
  secondaryValue: number;

  constructor(text: cardType) {
    this.text = text;
    if (typeof text === "number") {
      this.value = text;
      this.secondaryValue = text;
    } else if (text !== "A") {
      this.value = 10;
      this.secondaryValue = 10;
    } else {
      this.value = 11;
      this.secondaryValue = 1;
    }
  }
}
