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
  return res.data
}

/**
 * 후잉 거래 입력용 데이터
 */
export class PostWhooingEntriesData {
  section_id;
  entry_date;
  l_account;
  l_account_id;
  r_account;
  r_account_id;
  item;
  money;
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
