import axios from 'axios';
import store from '@/store/store';
import { WhooingResponseArrayModel } from '@/models/WhooingResponseArrayModel';
import { WhooingFrequentItem } from '@/models/WhooingFrequentItem';

/**
 * 후잉 유저 정보
 */
export async function getWhooingFrequentItems(
  sectionId: string,
): Promise<WhooingResponseArrayModel<WhooingFrequentItem>> {
  const url = `https://old.whooing.com/api/frequent_items.json_array?section_id=${sectionId}`;
  const key = store.getters.apiKey;
  const res = await axios.get(url, {
    headers: {
      'X-API-KEY': key,
    },
  });
  return res.data as WhooingResponseArrayModel<WhooingFrequentItem>;
}

// let sampleData = {
//   'code': 200,
//   'message': '',
//   'error_parameters': {},
//   'rest_of_api': 4988,
//   'results': {
//     'slot1': [{
//       'item_id': 'f4',
//       'item': '생필품',
//       'money': 40000,
//       'l_account': 'expenses',
//       'l_account_id': 'x12',
//       'r_account': 'assets',
//       'r_account_id': 'x5'
//     },
//     {
//       'item_id': 'f8',
//       'item': '공과금',
//       'money': 52390,
//       'l_account': 'expenses',
//       'l_account_id': 'x12',
//       'r_account': 'assets',
//       'r_account_id': 'x5'
//     }
//       // ...
//     ],
//     'slot2': [
//       // ...
//     ]
//     // ...
//   }
// }
