import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret, faCoffee);
Vue.component("font-awesome-icon", FontAwesomeIcon);
