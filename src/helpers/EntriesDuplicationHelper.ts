import { WhooingEntryModel } from "@/models/WhooingEntryModel";

export interface IDuplicationOptions {
  isSameMoney: boolean;
  isSameItem: boolean;
  isSameLeft: boolean;
  isSameRight: boolean;
  isSameDate: boolean;
}

export interface IKeyObject {
  date: string | null;
  item: string | null;
  left: string | null;
  right: string | null;
  money: string | null;
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

  /**
   * 키값을 파싱해서 오브젝트로 반환
   * @param duplicationKey 중복그룹키값
   */
  export const parseKey = (duplicationKey: string): IKeyObject => {
    const [date, item, left, right, money] = duplicationKey
      .split("|")
      .map((o) => (o === "*" ? null : o)); // '*'는 null로치환
    return { date, item, left, right, money };
  };

  function createKey(
    entry: WhooingEntryModel,
    options: IDuplicationOptions,
  ): string {
    const date = options.isSameDate
      ? Math.floor(Number(entry.entry_date)).toString()
      : "*";
    const item = options.isSameItem ? entry.item.split("(")[0] : "*";
    const left = options.isSameLeft ? entry.l_account_id : "*";
    const right = options.isSameRight ? entry.r_account_id : "*";
    const money = options.isSameMoney ? entry.money : "*";
    const key = [date, item, left, right, money].join("|");
    return key;
  }
}
