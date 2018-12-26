<template>
  <div>유저정보를 불러오는중입니다..</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { getWhooingAccessToken } from '@/api/GetWhooingAccessToken';
import { GetWhooingAccessTokenData } from '@/models/GetWhooingAccessTokenData';
import { AlertModel, AlertType } from '@/models/AlertModel';

import { AuthModule, UserModule } from '@/store/store';
import { AppModule } from '@/store/store';

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
      } finally {
        this.$router.push('/');
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