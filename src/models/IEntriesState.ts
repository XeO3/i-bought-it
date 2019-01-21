export interface IEntriesState {
  data: IEntryItem[];
}

export interface IEntryItem {
  syncDate: Date;
  section_id: string;
  right: string;
  data: IEntryDataItem[];
}

export interface IEntryDataItem {
  item: string;
  money: string;
  left: string;
}
