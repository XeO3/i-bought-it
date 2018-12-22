<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-btn slot="activator" icon>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">로그인</v-card-title>
      <v-card-text>
        <p>이거샀어 서비스를 이용하시기위해서는 후잉 로그인이 필요합니다.</p>
        <v-btn @click="getLoginHtml" color="primary" block>Whoing로그인</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="dialog = false">close</v-btn>
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
    isLoading: false
  };

  public async getLoginHtml() {
    const res = await getWhooingAppToken(
      new GetWhooingAppTokenData(AppModule.appId, AppModule.appSecret)
    );
    this.token = res.token;
    this.$nextTick(function() {
      (this.$refs.formWhooingLogin as HTMLFormElement).submit();
    });
  }
}
</script>
