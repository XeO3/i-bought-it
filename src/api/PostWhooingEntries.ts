import Urls from "@/config/Urls";
import { IWhooingResponseModel } from "@/models/IWhooingResponseModel";
import { PostWhooingEntriesData } from "@/models/PostWhooingEntriesData";
import { WhooingEntryModel } from "@/models/WhooingEntryModel";
import store from "@/store/store";
import { Whooing } from "@/utils/WhooingHelper";
import axios from "axios";

/**
 * 후잉 거래 입력
 */
export async function postWhooingEntries(
  data: PostWhooingEntriesData,
): Promise<IWhooingResponseModel<WhooingEntryModel[]>> {
  const url = Urls.whooingApi + "entries";
  const formData = data.GetFormData();
  const apikey = Whooing.ApiKey();
  const res = await axios.post<IWhooingResponseModel<WhooingEntryModel[]>>(
    url,
    formData,
    {
      headers: {
        "X-API-KEY": apikey,
      },
    },
  );
  return res.data;
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
