import { IPostData } from "./IPostData";
/**
 * 후잉 엑서스 토큰 발급용 데이터
 */
export class GetWhooingAccessTokenData extends IPostData {
  constructor(
    public appId: string,
    public appSecret: string,
    public token: string,
    public pin: string,
  ) {
    super();
  }
  public GetFormData(): FormData {
    const formData = new FormData();
    formData.append("app_id", this.appId);
    formData.append("app_secret", this.appSecret);
    formData.append("token", this.token);
    formData.append("pin", this.pin);
    return formData;
  }
}
