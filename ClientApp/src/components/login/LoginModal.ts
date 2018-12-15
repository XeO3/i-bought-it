import { Component, Vue, Prop } from 'vue-property-decorator';
import { getWhooingAppToken } from '@/api/GetWhooingAppToken';
import { GetWhooingAppTokenData } from '@/models/GetWhooingAppTokenData';

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
    console.log(this)
    const res = await getWhooingAppToken(
      new GetWhooingAppTokenData(
        '190',
        '45cf40565fcc263c8dd63773aaa2a3f279ea4f62',
      ),
    );
    console.log(this)
    this.token = res.token;
    this.$nextTick(function() {
      (this.$refs.formWhooingLogin as HTMLFormElement).submit();
    });
  }

}
