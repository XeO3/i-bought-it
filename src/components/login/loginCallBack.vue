<template>
  <div>
    로그인 완료
  </div>
</template>

<script>
export default {
  computed: {
    token () {
      return this.$router.query.token
    },
    pin () {
      return this.$router.query.pin
    }
  }
}
</script>

<style>
</style>
