<template>
  <div id='app'>
    <v-app id='inspire'>
      <v-navigation-drawer fixed
                           clipped
                           class='grey lighten-4'
                           app
                           v-model='drawer'>
        <v-list dense
                class='grey lighten-4'>
          <template v-for='(item, i) in items'>
            <v-divider dark
                       v-if='item.divider'
                       class='my-3'
                       :key='i'></v-divider>
            <v-list-tile :key='i'
                         v-else
                         @click='itemClick(item.click)'>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class='grey--text'>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color='primary'
                 app
                 absolute
                 clipped-left>
        <v-toolbar-side-icon @click.native='drawer = !drawer'></v-toolbar-side-icon>
        <span class='title ml-3 mr-5'>이거샀어!&nbsp;<span class='text'>for Whooing</span></span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-container fluid
                     fill-height
                     class='grey lighten-4'>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  private drawer = false;
  private items = [
    { icon: "settings", text: "Settings" },
    { divider: true },
    {
      icon: "open_in_new",
      text: "Whooing 바로가기",
      click: "openWhooing"
    }
  ];
  
  public itemClick(key: string) {
    switch (key) {
      case "openWhooing":
        var win = window.open("https://whooing.com/", "_blank");
        if (win instanceof Window) {
          win.focus();
          return;
        }
    }
  }
}
</script>

<style>
</style>
