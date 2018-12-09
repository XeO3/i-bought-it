export class WhooingUserModel {
  constructor(
    public user_id: number,
    public username: string,
    public last_ip: string,
    public last_login_timestamp: number,
    public created_timestamp: number,
    public modified_timestamp: number,
    public language: string,
    public level: string,
    public expire: number,
    public timezone: string,
    public currency: string,
    public country: string,
    public image_url: string,
    public mileage: number,
  ) {}
}
