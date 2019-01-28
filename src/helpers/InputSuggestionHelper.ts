import { EntriesHelper } from '@/store/modules/Entries';
import fns from 'date-fns';
import { WhooingEntryModel } from '@/models/WhooingEntryModel';

export interface IInputSeggestionItem {
  item: string;
  left: string;
  right: string;
  score: number;
  data: WhooingEntryModel[];
}

export namespace InputSuggestionHelper {
  export function get(
    section_id: string,
    payload: { item?: string; left?: string; right?: string; money?: string },
  ): IInputSeggestionItem[] {
    const list: IInputSeggestionItem[] = [];
    const entry = EntriesHelper.FindSection(section_id);
    if (entry) {
      entry.data.forEach((en) => {
        if (
          // (!payload.item || en.item === payload.item) &&
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
            list.push({
              item: en.item,
              left: en.l_account_id,
              right: en.r_account_id,
              score: 1,
              data: [en],
            });
          }
        }
      });
    }
    return list.sort((a, b) => {
      return a.score > b.score ? 1 : a.score < b.score ? -1 : 0;
    });
  }
}
