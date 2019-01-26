import { IPostData } from './IPostData';
/**
 * 후잉 거래 입력용 데이터
 */
export class PostWhooingEntriesData extends IPostData {
  public data: IPostWhooingEntriesData;
  constructor(data: IPostWhooingEntriesData) {
    super();
    this.data = data;
  }
  public GetFormData(): FormData {
    const formData = new FormData();
    formData.append('section_id', this.data.section_id || '');
    formData.append('l_account', this.data.l_account || '');
    formData.append('l_account_id', this.data.l_account_id || '');
    formData.append('r_account', this.data.r_account || '');
    formData.append('r_account_id', this.data.r_account_id || '');
    formData.append('item', this.data.item || '');
    formData.append('money', this.data.money.toString() || '');
    formData.append('memo', this.data.memo || '');
    return formData;
  }
}

export interface IPostWhooingEntriesData {
  /** 섹션의 고유번호 Example Value : s99 */
  section_id: string;
  /** 왼쪽의 계정 Example Value : expenses */
  l_account: string;
  /** 왼쪽의 항목 고유번호 Example Value : x20 */
  l_account_id: string;
  /** 오른쪽의 계정 Example Value : assets */
  r_account: string;
  /** 오른쪽의 항목 고유번호 Example Value : x4 */
  r_account_id: string;
  /** 아이템 or 거래처. 괄호메모나 명령어도 포함. Example Value : 후원(과장학금)**2 */
  item: string;
  /** 거래액 Example Value : 10000 */
  money: number;
  /** 거래에 들어가는 보충 메모. 일기. 이 값으로는 검색할 수 없음. Example Value : 오늘도 어김없이 빠져나갔다 */
  memo: string;
}
