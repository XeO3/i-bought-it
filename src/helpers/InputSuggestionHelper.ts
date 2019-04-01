import { IInputSeggestionItem } from "@/models/IInputSeggestionItem";
import { InputSeggestionItem } from "@/models/InputSeggestionItem";
import { EntriesHelper } from "@/store/modules/Entries";

export namespace InputSuggestionHelper {
  export function get(
    section_id: string,
    payload: { item?: string; left?: string; right?: string; money?: string },
  ): IInputSeggestionItem[] {
    const list: IInputSeggestionItem[] = [];
    const entry = EntriesHelper.FindSection(section_id);
    if (entry) {
      entry.data.forEach((en) => {
        const itemText = (payload.item || "").split("(")[0];
        if (
          (!payload.item || en.item.indexOf(itemText) === 0) &&
          (!payload.right || en.r_account_id === payload.right) &&
          (!payload.left || en.l_account_id === payload.left)
        ) {
          const item = list.find(
            (o) =>
              o.item === en.item &&
              o.left === en.l_account_id &&
              o.right === en.r_account_id,
          );
          if (item) {
            item.data.push(en);
            item.score += 1;
          } else {
            list.push(
              new InputSeggestionItem(
                en.item,
                en.l_account_id,
                en.r_account_id,
                1,
                [en],
              ),
            );
          }
        }
      });
    }
    return list.sort((a, b) => {
      return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
    });
  }
}
