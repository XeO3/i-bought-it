import { WhooingEntryModel } from "@/models/WhooingEntryModel";

export interface IDuplicationOptions {
  startDate: string;
  endDate: string;
  isSameMoney: boolean;
  isSameItem: boolean;
  isSameLeft: boolean;
  isSameRight: boolean;
  isSameDate: boolean;
}

export namespace EntriesDuplicationHelper {
  export const duplicateEntries = (
    entries: WhooingEntryModel[],
    options: IDuplicationOptions,
  ) => {
    const result: { [index: string]: WhooingEntryModel[] } = {};

    entries.forEach((o) => {
      const key = createKey(o, options);
      if (Object.keys(result).includes(key)) {
        result[key].push(o);
      } else {
        result[key] = [o];
      }
    });

    return result;
  };

  function createKey(
    entry: WhooingEntryModel,
    options: IDuplicationOptions,
  ): string {
    const date = options.isSameDate ? Math.floor(entry.entry_date).toString() : "*";
    const item = options.isSameItem ? entry.item.split("(")[0] : "*";
    const left = options.isSameLeft ? entry.l_account_id : "*";
    const right = options.isSameRight ? entry.r_account_id : "*";
    const money = options.isSameMoney ? entry.money : "*";
    const key = [date, item, left, right, money].join("|");
    return key;
  }
}
