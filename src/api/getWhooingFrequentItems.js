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
 * 후잉 유저 정보
 */
export const getWhooingFrequentItems = function (section_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://old.whooing.com/api/frequent_items.json_array?section_id=${section_id}`;
        let key = store.getters.apiKey;
        const res = yield axios.get(url, {
            headers: {
                'X-API-KEY': key
            }
        });
        return res.data;
    });
};
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
//# sourceMappingURL=getWhooingFrequentItems.js.map