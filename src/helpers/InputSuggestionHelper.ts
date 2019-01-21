export interface IInputSeggestionItem {
  item: string;
  money: string;
  left: string;
  right: string;
}

export namespace InputSuggestionHelper {
  export function get(
    section_id: string,
    payload: IInputSeggestionItem,
  ): IInputSeggestionItem[] {
    return [];
  }
}
