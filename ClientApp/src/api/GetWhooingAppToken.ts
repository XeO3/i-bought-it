import axios from 'axios';
import { GetWhooingAppTokenData } from '@/models/GetWhooingAppTokenData';

/**
 * 후잉 토큰 얻기
 * @param getWhooingAppTokenData 폼데이터
 */
export async function getWhooingAppToken(data: GetWhooingAppTokenData): Promise<string> {
  const url = 'https://old.whooing.com/app_auth/request_token';
  const formData = data.GetFormData();
  const res = await axios.post(url, formData);
  return res.data as string;
};


