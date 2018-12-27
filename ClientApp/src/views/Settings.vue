<template>
  <v-layout row wrap>
    <v-flex v-for="(section, section_i) in sections" :key="section.section_id" xs12 sm12>
      <v-card class="mb-2">
         <v-toolbar color="teal" dark>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>help</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-title class="grey lighten-2">
          <h3>{{section_i+1}}. {{section.title}}</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-list subheader>
            <v-subheader>자산</v-subheader>
            <v-list-tile v-for="asset in section.accounts.assets" :key="asset.account_id">
              <v-list-tile-content>
                <v-list-tile-title>{{ asset.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserModule } from '@/store/store';
@Component({})
export default class Settings extends Vue {
  get sections() {
    return UserModule.sectionList;
  }
}
</script>
