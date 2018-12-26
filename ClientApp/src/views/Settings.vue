<template>
  <v-layout row wrap>
    <v-flex v-for="(section, section_i) in sections" :key="section.section_id" xs12 sm12>
      <v-card class="mb-2">
        <v-card-title class="grey lighten-2">
          <h3>{{section_i+1}}. {{section.title}}</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text></v-card-text>
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
