<template>
  <v-container align-center>
    <v-layout row wrap class="text-xs-center">
      <v-flex v-if="isManual">
        <h2>수동 인증</h2>
        <p>아래 코드를 복사해서 로그인 코드 입력란에 직접 입력해주세요.</p>
        {{pin}}_{{token}}
      </v-flex>
      <v-flex xs12 v-else>
        <p>유저정보를 불러오는중입니다..</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { getWhooingAccessToken } from '@/api/GetWhooingAccessToken';
import { GetWhooingAccessTokenData } from '@/models/GetWhooingAccessTokenData';
import { AlertModel, AlertType } from '@/models/AlertModel';

import { AuthModule, UserModule, AppDataModule } from '@/store/store';
import { AppModule } from '@/store/store';
import { AppData } from '@/store/modules/AppData';

@Component({})
export default class LoginCallBack extends Vue {
  @Prop({ type: String })
  public random!: string;

  get token(): string {
    return this.$route.query.token as string;
  }
  get pin(): string {
    return this.$route.query.pin as string;
  }

  get isManual() {
    return this.random === 'showCode';
  }

  public created() {
    if (!this.isManual) {
      this.getAccessToken();
    }
  }

  @Watch('random')
  public onChangeRandom(newVal: string) {
    if (!this.isManual) {
      this.getAccessToken();
    }
  }

  public async getAccessToken() {
    if (this.token && this.pin) {
      try {
        await this.LoginAsync();
        this.$router.replace('/dashboard');
      } catch (e) {
        this.FailLogin();
        this.$router.replace('/');
      }
    }
  }

  private async LoginAsync() {
    const res = await getWhooingAccessToken(
      new GetWhooingAccessTokenData(
        AppModule.appId,
        AppModule.appSecret,
        this.token,
        this.pin,
      ),
    );
    AuthModule.SET_TOKEN(res.token);
    AuthModule.SET_TOKEN_SECRET(res.token_secret);
    await UserModule.FetchUserInfoAsync();
    await UserModule.FetchSectionList();
    AppDataModule.FetchWhooingBs();
  }

  private FailLogin() {
    alert('유저정보를 불러오는중 에러가 발생했습니다.');
    const newAlert = new AlertModel();
    newAlert.message = '유저정보를 불러오는중 에러가 발생했습니다.';
    newAlert.type = AlertType.error;
    newAlert.dismissible = true;
    AppModule.ADD_ALERT(newAlert);
    AuthModule.LogOut();
  }
}
</script>