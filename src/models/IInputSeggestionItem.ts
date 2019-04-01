import { WhooingEntryModel } from "./WhooingEntryModel";
export interface IInputSeggestionItem {
    key: string;
    item: string;
    left: string;
    right: string;
    score: number;
    data: WhooingEntryModel[];
}
