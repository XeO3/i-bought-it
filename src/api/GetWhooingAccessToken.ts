import axios from 'axios';
import { GetWhooingAccessTokenData } from '@/models/GetWhooingAccessTokenData';
import Urls from '@/config/Urls';

/**
 * 후잉 엑서스 토큰 발급
 * @param {GetWhooingAccessTokenData} GetWhooingAccessTokenData 폼데이터
 */
export async function getWhooingAccessToken(
  data: GetWhooingAccessTokenData,
): Promise<IWhooingAccessToken> {
  const url = Urls.whooingAppAuth + 'access_token';
  const formData = data.GetFormData();
  const res = await axios.post<IWhooingAccessToken>(url, formData);
  return res.data;
}

export interface IWhooingAccessToken {
  token: string;
  token_secret: string;
  user_id: number;
}
