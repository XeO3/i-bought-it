<template>
     <v-app id="inspire">
      <left-nav></left-nav>
      <v-toolbar color="primary" app absolute clipped-left>
        <v-toolbar-side-icon @click="ToggleLeftNav"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">
          이거샀어!&nbsp;
          <span class="text">for Whooing</span>
        </span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height class="grey lighten-4">
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
</template>
