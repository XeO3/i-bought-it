export class UserState {
  constructor(
    public token: string,
    public token_secret: string,
    public user_id: string,
    public user: string,
    public sections: string,
    public accounts: string,
    public frequentItems: string,
  ) {}
}
