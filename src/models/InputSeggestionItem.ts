import { IInputSeggestionItem } from "./IInputSeggestionItem";
import { WhooingEntryModel } from "./WhooingEntryModel";

export class InputSeggestionItem implements IInputSeggestionItem {
  public key: string;
  public item: string;
  public left: string;
  public right: string;
  public score: number;
  public data: WhooingEntryModel[];
  public constructor(
    item: string,
    left: string,
    right: string,
    score: number = 0,
    data: WhooingEntryModel[] = [],
  ) {
    this.key = `${item}|${left}|${right}`;
    this.item = item;
    this.left = left;
    this.right = right;
    this.score = score;
    this.data = data;
  }
}
