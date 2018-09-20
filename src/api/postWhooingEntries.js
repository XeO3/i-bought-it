import axios from 'axios'
import store from '../store'

/**
 * 후잉 거래 입력
 */
export const postWhooingEntries = async function (postWhooingEntriesData) {
  const url = 'https://api-i-bought-it.azurewebsites.net/api/whooing/entries'
  let formData = new FormData()
  for (var key in postWhooingEntriesData) {
    formData.append(key, postWhooingEntriesData[key])
  }
  let apikey = store.getters.apiKey
  const res = await axios.post(url, formData, {
    headers: {
      'X-API-KEY': apikey
    }
  })

  if (res.data.code === 200) {
    return res.data
  } else {
    throw new Error(`거래 입력 실패(${res.data.code})`)
  }
}

/**
 * 후잉 거래 입력용 데이터
 */
export class PostWhooingEntriesData {
  /** 섹션의 고유번호 Example Value : s99 */
  section_id;
  /** 거래가 일어난 날짜 Example Value : 20110812 */
  entry_date;
  /** 왼쪽의 계정 Example Value : expenses */
  l_account;
  /** 왼쪽의 항목 고유번호 Example Value : x20 */
  l_account_id;
  /** 오른쪽의 계정 Example Value : assets */
  r_account;
  /** 오른쪽의 항목 고유번호 Example Value : x4 */
  r_account_id;
  /** 아이템 or 거래처. 괄호메모나 명령어도 포함. Example Value : 후원(과장학금)**2 */
  item;
  /** 거래액 Example Value : 10000 */
  money;
  /** 거래에 들어가는 보충 메모. 일기. 이 값으로는 검색할 수 없음. Example Value : 오늘도 어김없이 빠져나갔다 */
  memo;
  constructor(section_id, l_account, l_account_id, r_account, r_account_id, money) {
    this.section_id = section_id
    this.l_account = l_account
    this.l_account_id = l_account_id
    this.r_account = r_account
    this.r_account_id = r_account_id
    this.money = money
  }
}

// let resultsample = {
//   'code': 200,
//   'message': '',
//   'error_parameters': {},
//   'rest_of_api': 4988,
//   'results': [
//     {
//       'entry_id': 1352827,
//       'entry_date': 20110812.0001,
//       'l_account': 'expenses',
//       'l_account_id': 'x20',
//       'r_account': 'assets',
//       'r_account_id': 'x4',
//       'item': '후원(과장학금)',
//       'money': 10000,
//       'total': '',
//       'memo': '오늘도 어김없이 빠져나갔다',
//       'app_id': 0
//     },
//     {
//       'entry_id': 1352827,
//       'entry_date': 20110912.0001,
//       'l_account': 'expenses',
//       'l_account_id': 'x20',
//       'r_account': 'assets',
//       'r_account_id': 'x4',
//       'item': '후원(과장학금)',
//       'money': 10000,
//       'total': '',
//       'memo': '오늘도 어김없이 빠져나갔다',
//       'app_id': 0
//     }
//   ]
// }
