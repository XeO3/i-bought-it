export class UserTokenData {
  constructor(
    public token: string,
    public token_secret: string,
    public user_id: string,
  ) {}
}
