<template>
  <v-toolbar color="primary" app absolute clipped-left>
    <v-toolbar-side-icon @click="ToggleSidebar">
      <v-icon>menu</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title>
      <span class="title ml-3 mr-5">
        이거샀어!&nbsp;
        <span class="text">for Whooing</span>
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <login-modal></login-modal>
  </v-toolbar>
</template>
<script lang="ts" src="./Header.ts"></script>
