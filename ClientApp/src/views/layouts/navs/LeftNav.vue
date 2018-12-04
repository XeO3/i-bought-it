<template>
      <v-navigation-drawer fixed
                           clipped
                           class="grey lighten-4"
                           app
                           v-model="opened">
        <v-list dense
                class="grey lighten-4">
          <template v-for="(item, i) in items">
            <v-divider dark
                       v-if="item.divider"
                       class="my-3"
                       :key="i"></v-divider>
            <v-list-tile :key="i"
                         v-else
                         @click="itemClick(item)">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
</template>

<script lang="ts" src="./LeftNav.ts"></script>
