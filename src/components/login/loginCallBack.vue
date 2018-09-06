<script>
import { getWhooingAccessToken, GetWhooingAccessTokenData } from '../../api/getWhooingAccessToken'
import { mapMutations, mapActions } from 'vuex'
import { setUserToken, logout, addAlertTop } from '../../store/mutation-types'
import { AlertModel } from '../../model'
export default {
  computed: {
    token () {
      return this.$route.query.token
    },
    pin () {
      return this.$route.query.pin
    }
  },
  methods: {
    ...mapMutations([setUserToken, logout, addAlertTop]),
    ...mapActions(['initUserDataAsync']),
    async getAccessToken () {
      if (this.token && this.pin) {
        try {
          let data = await getWhooingAccessToken(
            new GetWhooingAccessTokenData(
              '190',
              '45cf40565fcc263c8dd63773aaa2a3f279ea4f62',
              this.token,
              this.pin
            )
          )
          console.log(data)
          this.setUserToken(data)
          await this.initUserDataAsync()
        } catch (e) {
          console.log('유저정보 불러오기 실패!', e)
          let newAlert = new AlertModel()
          newAlert.message = '유저정보를 불러오는중 에러가 발생했습니다.'
          newAlert.type = 'error'
          newAlert.dismissible = true
          this.addAlertTop(newAlert)
          this.logout()
        }
      }
    }
  },
  created () {
    this.getAccessToken()
      .then(() => this.$router.replace('/'))
  }
}
</script>

<template>
  <div>
    인증완료
  </div>
</template>

<style>
</style>
