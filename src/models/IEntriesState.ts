import { WhooingEntryModel } from "./WhooingEntryModel";

export interface IEntriesState {
  sections: IEntrySection[];
}

export interface IEntrySection {
  syncDate?: Date;
  section_id: string;
  data: WhooingEntryModel[];
}
