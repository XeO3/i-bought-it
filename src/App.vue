<script lang="ts" src="./app.ts"></script>
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
      <user-menu v-if=user></user-menu>
      <login-modal v-else></login-modal>
      <!-- <v-btn icon
             @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <div name="top-alert">
        <v-alert v-if="alertsTop.length > 0"
                 :value="true"
                 @input="val=> removeAlretTop(alertsTop[0])"
                 :icon="alertsTop[0].icon"
                 :dismissible="alertsTop[0].dismissible"
                 :outline="alertsTop[0].outline"
                 :transition="alertsTop[0].transition"
                 :type="alertsTop[0].type">
          {{alertsTop[0].message}}
        </v-alert>
      </div>
      <router-view />
    </v-content>
    <!-- <v-navigation-drawer temporary
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
    </v-navigation-drawer> -->
    <v-footer :fixed="fixed"
              app>
      <span>&copy; 2018 이거샀어! I bought it!</span>
    </v-footer>
  </v-app>
</template>



