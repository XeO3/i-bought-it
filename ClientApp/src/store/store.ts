import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import inventory, { InventoryState } from './inventory/inventory';
import basket, { BasketState } from './basket/basket';
import { getStoreBuilder } from 'vuex-typex';

export interface RootState {
  basket: BasketState;
  inventory: InventoryState;
}

Vue.use(Vuex);
const store: Store<RootState> = getStoreBuilder<RootState>().vuexStore();
export default store; // <-- "store" to provide to root Vue