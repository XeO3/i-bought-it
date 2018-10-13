var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import store from '../store';
/**
 * 후잉 거래 입력
 */
export const postWhooingEntries = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        // const url = 'https://api-i-bought-it.azurewebsites.net/api/whooing/entries'
        const url = 'https://old.whooing.com/api/entries';
        let formData = data.GetFormData();
        let apikey = store.getters.apiKey;
        const res = yield axios.post(url, formData, {
            headers: {
                'X-API-KEY': apikey
            }
        });
        if (res.data.code === 200) {
            return res.data;
        }
        else {
            throw new Error(`거래 입력 실패(${res.data.code})`);
        }
    });
};
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
//# sourceMappingURL=postWhooingEntries.js.map