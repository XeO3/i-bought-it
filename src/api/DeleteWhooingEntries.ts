import axios from 'axios';
import Urls from '@/config/Urls';
import { IWhooingResponseModel } from '@/models/IWhooingResponseModel';
import { Whooing } from '@/utils/WhooingHelper';

/**
 * 후잉 거래 삭제
 */
export async function DeleteWhooingEntries(
  entry_ids: number | number[],
): Promise<IWhooingResponseModel<void>> {
  const url = Urls.whooingApi + 'entries/' + entry_ids;
  const key = Whooing.ApiKey();
  const res = await axios.delete(url, {
    headers: {
      'X-API-KEY': key,
    },
  });
  if (res.data.code === 200) {
    return res.data;
  } else {
    throw new Error(`유저정보 불러오기 실패(${res.data.code})`);
  }
}

// Example Results(.json, .json_array)
// {
// 	"code" : 200,
// 	"message" : "",
// 	"error_parameters" : {},
// 	"rest_of_api" : 4948
// }
