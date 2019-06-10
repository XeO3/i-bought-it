import Urls from "@/config/Urls";
import { IWhooingResponseModel } from "@/models/IWhooingResponseModel";
import { IWhooingUser } from "@/models/WhooingUserModel";
import { AuthModule } from "@/store/store";
import { Whooing } from "@/utils/WhooingHelper";
import axios from "axios";

/**
 * 후잉 유저 정보
 */
export async function getWhooingUser(): Promise<
  IWhooingResponseModel<IWhooingUser>
> {
  const url = Urls.whooingApi + "user.json";
  const key = Whooing.ApiKey();
  const res = await axios.get<IWhooingResponseModel<IWhooingUser>>(url, {
    headers: {
      "X-API-KEY": key,
    },
  });
  if (res.data.code === 200) {
    return res.data;
  } else {
    if (res.data.code === 405) {
      AuthModule.SET_TOKENEXPIRATION(true);
    }
    throw new Error(`유저정보 불러오기 실패(${res.data.code})`);
  }
}

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
