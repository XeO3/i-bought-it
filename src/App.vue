<template>
  <div id="app">
    <TheHeading />
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import TheHeading from "./components/organisms/TheHeading.vue";

const App = defineComponent({
  components: { TheHeading: TheHeading }
});
export default App;
</script>
