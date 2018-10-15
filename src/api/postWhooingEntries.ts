import axios from 'axios'
import store from '../store'
import { PostWhooingEntriesData, WhooingResponseArrayModel, WhooingEntryModel } from '../Types';

/**
 * 후잉 거래 입력
 */
export const postWhooingEntries = async function (data: PostWhooingEntriesData): Promise<WhooingResponseArrayModel<WhooingEntryModel>> {
  // const url = 'https://api-i-bought-it.azurewebsites.net/api/whooing/entries'
  const url = 'https://old.whooing.com/api/entries'
  let formData = data.GetFormData()
  let apikey = store.getters.apiKey
  const res = await axios.post(url, formData, {
    headers: {
      'X-API-KEY': apikey
    }
  })
  return res.data as WhooingResponseArrayModel<WhooingEntryModel>
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
