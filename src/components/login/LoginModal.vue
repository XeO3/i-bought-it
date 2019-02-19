<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-btn slot="activator" icon>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">로그인</v-card-title>
      <v-card-text v-if="states.isCallback">
        <p>이거샀어 서비스를 이용하시기위해서는 후잉 로그인이 필요합니다.</p>
        <v-btn @click="getLoginHtml" color="primary" block>Whoing로그인</v-btn>
      </v-card-text>
      <v-card-text v-else>
        <p>iOS에서 PWA를 이용하시는경우 코드 직접입력을 이용해주세요.</p>
        <p>아래 링크에서 발급받은 후 인증코드를 직접 입력해 주세요.</p>
        <v-btn
          v-if="form.pin"
          @click="$router.push({name:'callback', query:{token:token, pin:form.pin}})"
          color="success"
          block
        >로그인</v-btn>
        <v-btn v-else @click="getLoginHtml" color="primary" block>인증코드 발급</v-btn>
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
      <input v-if="states.isCallback" type="hidden" name="callbackuri" v-model="reutrnUrl">
    </form>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { getWhooingAppToken } from '@/api/GetWhooingAppToken';
import { GetWhooingAppTokenData } from '@/models/GetWhooingAppTokenData';
import { AppModule } from '@/store/store';
import Urls from '@/config/Urls';

@Component({})
export default class LoginModal extends Vue {
  public dialog: boolean = false;
  public token: string = '';
  public authUrl: string = Urls.whooingAppAuth;
  public reutrnUrl: string =
    window.location.origin +
    '/whooing/callback/' +
    Math.random()
      .toString(36)
      .substring(7);
  public states = {
    isLoading: false,
    isCallback: true,
  };
  public form = {
    pin: '',
  };

  public async getLoginHtml() {
    const res = await getWhooingAppToken(
      new GetWhooingAppTokenData(AppModule.appId, AppModule.appSecret),
    );
    this.token = res.token;
    this.$nextTick(() => {
      if (!this.states.isCallback) {
        window.open(
          '',
          'formpopup',
          'width=400,height=400,resizeable,scrollbars',
        );
        (this.$refs.formWhooingLogin as HTMLFormElement).target = 'formpopup';
      }
      (this.$refs.formWhooingLogin as HTMLFormElement).submit();
    });
  }
}
</script>
