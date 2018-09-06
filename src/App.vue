<script>
import LoginModalVue from './components/LoginModal.vue'
import { mapState, mapMutations } from 'vuex'
import { removeAlretTop } from './store/mutation-types'

export default {
  name: 'App',
  components: {
    LoginModal: LoginModalVue
  },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '이거 샀어'
    }
  },
  computed: {
    ...mapState({
      alertsTop: state => state.alerts.top
    })
  },
  methods: {
    ...mapMutations([removeAlretTop])
  }
}
</script>

<template>
  <v-app>
    <v-navigation-drawer persistent
                         :mini-variant="miniVariant"
                         :clipped="clipped"
                         v-model="drawer"
                         enable-resize-watcher
                         fixed
                         app>
      <v-list>
        <v-list-tile value="true"
                     v-for="(item, i) in items"
                     :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app
               :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <login-modal></login-modal>
      <v-btn icon
             @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <div name="top-alert">
        <v-alert v-for="(item, i) in alertsTop"
                 :key="i"
                 :value="true"
                 @input="val=> removeAlretTop(item)"
                 :icon="item.icon"
                 :dismissible="item.dismissible"
                 :outline="item.outline"
                 :transition="item.transition"
                 :type="item.type">
          {{item.message}}
        </v-alert>
      </div>
      <router-view/>
    </v-content>
    <v-navigation-drawer temporary
                         :right="right"
                         v-model="rightDrawer"
                         fixed
                         app>
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed"
              app>
      <span>&copy; 2017</span>
    </v-footer>

  </v-app>
</template>


