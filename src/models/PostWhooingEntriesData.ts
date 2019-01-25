import { IPostData } from './IPostData';
/**
 * 후잉 거래 입력용 데이터
 */
export class PostWhooingEntriesData extends IPostData {
  constructor(
    /** 섹션의 고유번호 Example Value : s99 */
    public sectionId: string,
    /** 거래가 일어난 날짜 Example Value : 20110812 */
    public lAccount: string,
    /** 왼쪽의 항목 고유번호 Example Value : x20 */
    public lAccountId: string,
    /** 오른쪽의 계정 Example Value : assets */
    public rAccount: string,
    /** 오른쪽의 항목 고유번호 Example Value : x4 */
    public rAccountId: string,
    /** 아이템 or 거래처. 괄호메모나 명령어도 포함. Example Value : 후원(과장학금)**2 */
    public item: string,
    /** 거래액 Example Value : 10000 */
    public money: number,
    /** 거래에 들어가는 보충 메모. 일기. 이 값으로는 검색할 수 없음. Example Value : 오늘도 어김없이 빠져나갔다 */
    public memo: string,
  ) {
    super();
  }
  public GetFormData(): FormData {
    const formData = new FormData();
    formData.append('section_id', this.sectionId);
    formData.append('l_account', this.lAccount);
    formData.append('l_account_id', this.lAccountId);
    formData.append('r_account', this.rAccount);
    formData.append('r_account_id', this.rAccountId);
    formData.append('item', this.item);
    formData.append('money', this.money.toString());
    formData.append('memo', this.memo);
    return formData;
  }
}


