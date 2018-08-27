<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="290">
    <v-btn slot="activator"
           small
           icon>
      <v-icon>person</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">
        Whoing로그인
      </v-card-title>
      <v-card-text>
        이거샀어 서비스를 이용하기 위해서는 후잉(whoing.com) 로그인이 필요합니다.
        <v-form>
          <v-text-field prepend-icon="person"
                        name="login"
                        label="Login"
                        type="text"></v-text-field>
          <v-text-field id="password"
                        prepend-icon="lock"
                        name="password"
                        label="Password"
                        type="password"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1"
               flat
               @click.native="dialog = false">close</v-btn>
        <v-btn color="primary"
               @click.native="dialog = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style>
</style>
