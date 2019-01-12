import axios from 'axios';
import { GetWhooingAppTokenData } from '@/models/GetWhooingAppTokenData';
import Urls from '@/config/Urls';

/**
 * 후잉 토큰 얻기
 * @param getWhooingAppTokenData 폼데이터
 */
export async function getWhooingAppToken(
  data: GetWhooingAppTokenData,
): Promise<IWhooingToken> {
  const url = Urls.whooingAppAuth + 'request_token';
  const formData = data.GetFormData();
  const res = await axios.post<IWhooingToken>(url, formData);
  return res.data;
}

export interface IWhooingToken {
  token: string;
}
