import axios from 'axios';
import { GetWhooingAccessTokenData } from '@/models/GetWhooingAccessTokenData';

/**
 * 후잉 엑서스 토큰 발급
 * @param {GetWhooingAccessTokenData} GetWhooingAccessTokenData 폼데이터
 */
export async function getWhooingAccessToken(
  data: GetWhooingAccessTokenData,
): Promise<string> {
  const url = 'https://old.whooing.com/app_auth/access_token';
  const formData = data.GetFormData();
  const res = await axios.post(url, formData);
  return res.data as string;
}
