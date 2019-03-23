import axios from "axios";
import { WhooingFrequentItem } from "@/models/WhooingFrequentItem";
import { Whooing } from "@/utils/WhooingHelper";
import { IWhooingResponseModel } from "@/models/IWhooingResponseModel";
import Urls from "@/config/Urls";

/**
 * 후잉 유저 정보
 */
export async function getWhooingFrequentItems(
  sectionId: string,
): Promise<IWhooingResponseModel<WhooingFrequentItem[]>> {
  const url = Urls.whooingApi + `frequent_items.json_array?section_id=${sectionId}`;
  const key = Whooing.ApiKey();
  const res = await axios.get<IWhooingResponseModel<WhooingFrequentItem[]>>(
    url,
    {
      headers: {
        "X-API-KEY": key,
      },
    },
  );
  return res.data;
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
