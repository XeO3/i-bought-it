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
export const getWhooingUser = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://old.whooing.com/api/user.json';
        // const url = 'https://api-i-bought-it.azurewebsites.net/api/whooing/user.json'
        let key = store.getters.apiKey;
        const res = yield axios.get(url, {
            headers: {
                'X-API-KEY': key
            }
        });
        if (res.data.code === 200) {
            return res.data;
        }
        else {
            throw new Error(`유저정보 불러오기 실패(${res.data.code})`);
        }
    });
};
// let sampleData = {
//   'code': 200,
//   'message': '',
//   'error_parameters': {},
//   'rest_of_api': 4988,
//   'results': {
//     'user_id': 27,
//     'username': 'Helloman',
//     'last_ip': '192.168.0.1',
//     'last_login_timestamp': 1322448931,
//     'created_timestamp': 1321448931,
//     'modified_timestamp': 1321448931,
//     'language': 'ko',
//     'level': '1',
//     'expire': 1321448931,
//     'timezone': 'Asia/Seoul',
//     'currency': 'KRW',
//     'country': 'KR',
//     'image_url': 'https://s3-ap-northeast-1.amazonaws.com/whooingprofile/p27.jpg',
//     'mileage': 230
//   }
// }
//# sourceMappingURL=getWhooingUser.js.map