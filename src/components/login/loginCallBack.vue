<script>
import { getWhooingAccessToken, GetWhooingAccessTokenData } from '../../api/getWhooingAccessToken'
import { mapMutations, mapActions } from 'vuex'
import { setUserToken } from '../../store/mutation-types'
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
    ...mapMutations([setUserToken]),
    ...mapActions(['initUserData']),
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
          this.initUserData()
        } catch (e) {
          console.log(e)
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
