<script>
import { mapState, mapMutations } from 'vuex'
import { logout } from '../store/mutation-types'
export default {
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    ...mapMutations([logout]),
    onClickLogout () {
      this.logout()
      this.$router.push('/')
    }
  }
}
</script>
<template>
  <v-menu v-if="user"
          offset-y>
    <v-btn slot="activator"
           icon>
      <v-icon>person</v-icon>
    </v-btn>
    <v-card>
      <v-list>
        <v-list-tile>
          <v-list-tile-title>{{ user.username }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary"
               flat
               @click="onClickLogout">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<style>
</style>
