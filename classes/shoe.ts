import { deck } from "../util/constants";
import { cardType } from "../util/types";
import { Card } from "./card";

export class Shoe {
  cardList: Card[] = [];
  shoeSize: number = 0;

  constructor(shoeSize: number = 4) {
    this.shoeSize = shoeSize;
    this.initializeShoe();
  }

  initializeShoe() {
    const decks: cardType[] = [];
    for (let i = 0; i < this.shoeSize; i++) {
      decks.push(...deck);
    }

    decks.forEach((d) => this.cardList.push(new Card(d)));

    this.shuffleCards();
  }

  dealCards(numberOfCards: number): Card[] {
    const cardsToDeal: Card[] = [];
    for (let i = 0; i < numberOfCards; i++) {
      if (this.cardList.length === 0) {
        this.initializeShoe();
      }
      cardsToDeal.push(...this.cardList.splice(0, 1));
    }
    return cardsToDeal;
  }

  shuffleCards(): void {
    const newCardList: Card[] = [];
    let counter = this.cardList.length;

    while (counter > 0) {
      const tempIndex = Math.floor(Math.random() * counter);
      newCardList.push(...this.cardList.splice(tempIndex, 1));
      counter -= 1;
    }

    this.cardList = newCardList;
  }
}
