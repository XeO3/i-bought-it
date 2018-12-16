import { Component, Vue, Prop } from 'vue-property-decorator';
import { getWhooingAppToken } from '@/api/GetWhooingAppToken';
import { GetWhooingAppTokenData } from '@/models/GetWhooingAppTokenData';
import { AppModule } from '@/store/modules/App';

@Component({})
export default class LoginModal extends Vue {
  public dialog: boolean = false;
  public token: string = '';
  public reutrnUrl: string =
    window.location.origin +
    '/whooing/callback/' +
    Math.random()
      .toString(36)
      .substring(7);
  public states = {
    isLoading: false,
  };

  public async getLoginHtml() {
    const res = await getWhooingAppToken(
      new GetWhooingAppTokenData(
        AppModule.appId,
        AppModule.appSecret,
      ),
    );
    this.token = res.token;
    this.$nextTick(function() {
      (this.$refs.formWhooingLogin as HTMLFormElement).submit();
    });
  }
}
