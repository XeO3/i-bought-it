<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="290">
    <v-btn slot="activator"
           small
           icon
           @click="getLoginHtml">
      <v-icon>person</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">
        Whoing로그인
      </v-card-title>
      <div b-html="login_html">
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1"
               flat
               @click.native="dialog = false">close</v-btn>
        <v-btn color="primary"
               @click.native="dialog = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
    <form action="https://whooing.com/app_auth/authorize"
          method="post"
          ref="form">
      <input type="hidden"
             name="token"
             v-model="token">
      <input type="hidden"
             name="callbackuri"
             v-model="reutrnUrl">
    </form>
  </v-dialog>
</template>

<script>
import { getWhooingAppToken, postWhooingLoginHtml } from '../../src/api'
import { GetWhooingAppTokenData, PostWhooingLoginHtmlData } from '../../src/model/'
export default {
  data () {
    return {
      dialog: false,
      login_html: null,
      token: null,
      reutrnUrl: 'http://localhost:8080/#/ok',
      states: {
        isLoading: false
      }
    }
  },
  methods: {
    async getLoginHtml () {
      var res = await getWhooingAppToken(new GetWhooingAppTokenData('190', '45cf40565fcc263c8dd63773aaa2a3f279ea4f62'))
      this.token = res.token
      // var html = await postWhooingLoginHtml(new PostWhooingLoginHtmlData(token, 'http://localhost:8080/#/ok'))
      // this.login_html = html
      this.$nextTick(function () {
        this.$refs.form.submit()
      })
    }
  },
  created () {
  }
}
</script>

<style>
</style>
