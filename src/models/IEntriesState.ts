export interface IEntriesState {
  sections: IEntrySection[];
}

export interface IEntrySection {
  syncDate: Date;
  section_id: string;
  data: IEntryDataItem[];
}

export interface IEntryDataItem {
  item: string;
  money: string;
  left: string;
  right: string;
}
