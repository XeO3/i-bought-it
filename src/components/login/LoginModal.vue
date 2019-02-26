<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-btn slot="activator" icon>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">로그인</v-card-title>
      <v-card-text v-if="states.isCallback">
        <p>이거샀어 서비스를 이용하시기위해서는 후잉 로그인이 필요합니다.</p>
        <v-btn @click="Submit" color="primary" block>Whoing로그인</v-btn>
      </v-card-text>
      <v-card-text v-else>
        <p>iOS에서 PWA를 이용하시는경우 코드 직접입력을 이용해주세요.</p>
        <p>아래 링크에서 발급받은 후 인증코드를 직접 입력해 주세요.</p>
        <v-btn v-if="form.pin" @click="ManualLogin" color="success" block>로그인</v-btn>
        <v-btn v-else @click="Submit" color="primary" block>인증코드 발급페이지</v-btn>
        <v-text-field label="인증코드" v-model="form.pin"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey darken-1" flat @click="states.isCallback = !states.isCallback">코드 직접입력</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="dialog = false">close</v-btn>
      </v-card-actions>
    </v-card>
    <form action="https://old.whooing.com/app_auth/authorize" method="post" ref="formWhooingLogin">
      <input type="hidden" name="token" v-model="token">
      <input type="hidden" name="callbackuri" v-model="reutrnUrl">
    </form>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { getWhooingAppToken } from '@/api/GetWhooingAppToken';
import { GetWhooingAppTokenData } from '@/models/GetWhooingAppTokenData';
import { AppModule, AuthModule } from '@/store/store';
import Urls from '@/config/Urls';

@Component({})
export default class LoginModal extends Vue {
  public dialog: boolean = false;

  public authUrl: string = Urls.whooingAppAuth;
  get reutrnUrl(): string {
    return (
      window.location.origin +
      '/whooing/callback/' +
      (this.states.isCallback
        ? Math.random()
            .toString(36)
            .substring(7)
        : 'showCode')
    );
  }
  public states = {
    isLoading: false,
    isCallback: true,
  };
  public form = {
    pin: '',
  };
  private popup: Window | null = null;

  get token(): string {
    return AuthModule.token;
  }

  set token(v: string) {
    AuthModule.SET_TOKEN(v);
  }

  public async Submit() {
    const res = await getWhooingAppToken(
      new GetWhooingAppTokenData(AppModule.appId, AppModule.appSecret),
    );
    this.token = res.token;
    this.$nextTick(() => {
      (this.$refs.formWhooingLogin as HTMLFormElement).submit();
    });
  }

  public ManualLogin() {
    var code = this.form.pin.split('_');
    const query = {
      pin: code[0],
      token: code[1] || this.token,
    };

    this.$router.push({
      name: 'callback',
      params: { random: 'login' },
      query,
    });
  }

  public destroy() {
    if (this.popup) {
      this.popup.close();
    }
  }
}
</script>
