import { IPostData } from './IPostData';
/**
 * 후잉 로그인 토큰 발급용 데이터
 */
export class GetWhooingAppTokenData extends IPostData {
  constructor(public appId: string, public appSecret: string) {
    super();
  }
  public GetFormData(): FormData {
    const formData = new FormData();
    formData.append('app_id', this.appId);
    formData.append('app_secret', this.appSecret);
    return formData;
  }
}
