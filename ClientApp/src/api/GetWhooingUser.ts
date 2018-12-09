import axios from 'axios';
import store from '@/store/store';
import { WhooingResponseModel } from '@/models/WhooingResponseModel';
import { WhooingUserModel } from '@/models/WhooingUserModel';

/**
 * 후잉 유저 정보
 */
export async function getWhooingUser(): Promise<WhooingResponseModel<WhooingUserModel>> {
  const url = 'https://old.whooing.com/api/user.json';
  // const url = 'https://api-i-bought-it.azurewebsites.net/api/whooing/user.json'
  const key = store.getters.apiKey;
  const res = await axios.get(url, {
    headers: {
      'X-API-KEY': key,
    },
  });
  if (res.data.code === 200) {
    return res.data;
  } else {
    throw new Error(`유저정보 불러오기 실패(${res.data.code})`);
  }
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
