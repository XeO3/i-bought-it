<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-btn slot="activator" icon>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">로그인</v-card-title>
      <v-card-text>
        <p>이거샀어 서비스를 이용하시기위해서는 후잉 로그인이 필요합니다.</p>
        <v-btn @click="Submit" color="primary" block>Whoing로그인</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="dialog = false">close</v-btn>
      </v-card-actions>
    </v-card>
    <form action="https://whooing.com/app_auth/authorize" method="post" ref="formWhooingLogin">
      <input type="hidden" name="token" v-model="token" />
      <input type="hidden" name="callbackuri" v-model="reutrnUrl" />
    </form>
  </v-dialog>
</template>

<script lang="ts">
import { getWhooingAppToken } from "@/api/GetWhooingAppToken";
import Urls from "@/config/Urls";
import { GetWhooingAppTokenData } from "@/models/GetWhooingAppTokenData";
import { AppModule, AuthModule } from "@/store/store";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class LoginModal extends Vue {
  public dialog: boolean = false;

  public authUrl: string = Urls.whooingAppAuth;
  get reutrnUrl(): string {
    return (
      window.location.origin +
      "/whooing/callback/" +
      Math.random()
        .toString(36)
        .substring(7)
    );
  }
  public states = {
    isLoading: false,
  };
  public form = {
    pin: "",
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

  public destroy() {
    if (this.popup) {
      this.popup.close();
    }
  }
}
</script>
