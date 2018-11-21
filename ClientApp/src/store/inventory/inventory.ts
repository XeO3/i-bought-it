// path: store/inventory/inventory.ts (module)

import { getStoreBuilder } from 'vuex-typex';
import { ActionContext, Store } from 'vuex';
import { RootState } from '@/models/RootState';
import axios from 'axios';

export interface InventoryState {
  productsById: { [productId: string]: Product };
}
export interface Product {
  id: string;
  name: string;
}

const initialInventoryState: InventoryState = {
  productsById: {
    fritos: { id: 'fritos', name: 'Fritos Corn Chips, Chili Cheese' },
    doritos: {
      id: 'doritos',
      name: 'Doritos Nacho Cheese Flavored Tortilla Chips',
    },
    cheetos: { id: 'cheetos', name: 'Cheetos Crunchy Cheese Flavored Snacks' },
    tostitos: {
      id: 'tostitos',
      name: 'Tostitos Original Restaurant Style Tortilla Chips',
    },
  },
};
const p = getStoreBuilder<RootState>().module('product', initialInventoryState);
const getProductByIdGetter = p.read(
  state => (id: string) => state.productsById[id],
  'getProductById'
);

// state
const stateGetter = p.state();

// exported "inventory" module interface
const inventory = {
  // state
  get state() {
    return stateGetter();
  },

  // getter as method
  getProductById(id: string) {
    return getProductByIdGetter()(id);
  },
};
export default inventory;
