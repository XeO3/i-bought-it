import { Component, Vue, Prop } from 'vue-property-decorator';
import { getWhooingAccessToken } from '@/api/GetWhooingAccessToken';
import { GetWhooingAccessTokenData } from '@/models/GetWhooingAccessTokenData';
import { AlertModel, AlertType } from '@/models/AlertModel';
import { AppModule } from '@/store/modules/App';
import { AuthModule } from '@/store/modules/Auth';
import { UserModule } from '@/store/modules/User';

@Component({})
export default class LoginCallBack extends Vue {
  get token(): string {
    return this.$route.query.token;
  }
  get pin(): string {
    return this.$route.query.pin;
  }

  public created() {
    this.getAccessToken();
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
    const token = await getWhooingAccessToken(
      new GetWhooingAccessTokenData(
        AppModule.appId,
        AppModule.appSecret,
        this.token,
        this.pin,
      ),
    );
    AuthModule.SET_TOKEN(token);
    await UserModule.FectchUserInfoAsync();
    await UserModule.FectchSections();
  }

  private FailLogin() {
    const newAlert = new AlertModel();
    newAlert.message = '유저정보를 불러오는중 에러가 발생했습니다.';
    newAlert.type = AlertType.error;
    newAlert.dismissible = true;
    AppModule.ADD_ALERT(newAlert);
    AuthModule.LogOut();
  }
}
