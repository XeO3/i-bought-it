/** 후잉 잔액 정보 */
export interface IWhooingBs {
  /** 자산 */
  assets: IWhooingBsItem;
  /** 부채 */
  liabilities: IWhooingBsItem;
}

/** 후잉 잔액 아이템 */
export interface IWhooingBsItem {
  /** 잔액 총계 */
  total: number;
  /** 계정아이템 리스트 */
  accounts: IWhooingBsAccountItem[];
}

/** 후잉 잔액 계정아이템 */
export interface IWhooingBsAccountItem {
  /** 계정 아이디 */
  account_id: string;
  /** 잔액 */
  money: number;
}
