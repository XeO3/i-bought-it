import { Component, Vue, Prop } from 'vue-property-decorator';
import { getWhooingAccessToken } from '@/api/GetWhooingAccessToken';
import { GetWhooingAccessTokenData } from '@/models/GetWhooingAccessTokenData';
import { AlertModel, AlertType } from '@/models/AlertModel';
import { AppModule } from '@/store/modules/app';

@Component({})
export default class LoginModal extends Vue {
  get token(): string {
    return this.$route.query.token;
  }
  get pin(): string {
    return this.$route.query.pin;
  }

  public async getAccessToken() {
    if (this.token && this.pin) {
      try {
        await this.LoginAsync();
      } catch (e) {
        this.FailLogin();
      }
    }
  }

  private async LoginAsync() {
    const data = await getWhooingAccessToken(
      new GetWhooingAccessTokenData(
        AppModule.appId,
        AppModule.appSecret,
        this.token,
        this.pin,
      ),
    );
    this.SetUserToken(data);
    await this.InitUserDataAsync();
  }

  private FailLogin() {
    const newAlert = new AlertModel();
    newAlert.message = '유저정보를 불러오는중 에러가 발생했습니다.';
    newAlert.type = AlertType.error;
    newAlert.dismissible = true;
    AppModule.ADD_ALERT(newAlert);
    this.Logout();
  }

  private Logout(): any {
    throw new Error('Method not implemented.');
  }
  private InitUserDataAsync(): any {
    throw new Error('Method not implemented.');
  }
  private SetUserToken(data: string): any {
    throw new Error('Method not implemented.');
  }
}
