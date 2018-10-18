<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="290">
    <v-btn slot="activator"
           icon>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">
        로그인
      </v-card-title>
      <v-card-text>
        <p>이거샀어 서비스를 이용하시기위해서는 후잉 로그인이 필요합니다.</p>
        <v-btn @click="getLoginHtml"
               color="primary"
               block>
          Whoing로그인
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1"
               flat
               @click.native="dialog = false">close</v-btn>
      </v-card-actions>
    </v-card>
    <form action="https://old.whooing.com/app_auth/authorize"
          method="post"
          ref="formWhooingLogin">
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
import { mapState } from 'vuex'
import { getWhooingAppToken } from '../../src/api/getWhooingAppToken'
import { GetWhooingAppTokenData } from '../types'
export default {
  data () {
    return {
      dialog: false,
      token: null,
      reutrnUrl: window.location.origin + '/whooing/callback/' + Math.random().toString(36).substring(7),
      states: {
        isLoading: false
      }
    }
  },
  computed: {
    ...mapState({
      user_id: state => state.user.user_id
    })
  },
  methods: {
    async getLoginHtml () {
      var res = await getWhooingAppToken(
        new GetWhooingAppTokenData(
          '190',
          '45cf40565fcc263c8dd63773aaa2a3f279ea4f62'
        )
      )
      this.token = res.token
      this.$nextTick(function () {
        this.$refs.formWhooingLogin.submit()
      })
    }
  },
  created () {
  }
}
</script>

<style>
</style>
