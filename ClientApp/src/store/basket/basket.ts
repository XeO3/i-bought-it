import { RootState } from '../store';
import inventory, { Product } from '../inventory/inventory';
import { getStoreBuilder, BareActionContext } from 'vuex-typex';
import { ActionContext } from 'vuex';
import axios from 'axios';

export interface Item {
  productId: string;
  quantity: number;
}
export interface DisplayItem {
  product: Product;
  quantity: number;
}
export interface BasketState {
  items: Item[];
  isLoading: boolean;
}

const initialBasketState: BasketState = { items: [], isLoading: false };
const b = getStoreBuilder<RootState>().module('basket', initialBasketState);

// getters
const numberOfItemsGetter = b.read(
  state => state.items.length,
  'numberOfItems'
);
const itemsGetter = b.read(state => {
  const displayItems: DisplayItem[] = state.items.map(item => {
    return {
      product: inventory.getProductById(item.productId),
      quantity: item.quantity,
    };
  });
  return displayItems;
});

// mutations
function appendItem(
  state: BasketState,
  payload: { productId: string; quantity: number }
) {
  state.items.push({
    productId: payload.productId,
    quantity: payload.quantity,
  });
}

function setIsLoading(state: BasketState, payload: { isLoading: boolean }) {
  state.isLoading = payload.isLoading;
}

// action
async function restoreSavedBasket(
  context: BareActionContext<BasketState, RootState>
) {
  const savedBasketId = localStorage['basketId'];

  try {
    basket.commitSetIsLoading({ isLoading: true });

    const { data: savedBasket } = await axios.get(
      `//chips-store.com/get-saved-basket/${savedBasketId}`,
      { responseType: 'json' }
    );
    const items: Item[] = savedBasket.items;
    items.forEach(item => basket.commitAppendItem(item));
  } finally {
    basket.commitSetIsLoading({ isLoading: false });
  }
}

// state
const stateGetter = b.state();

// exported "basket" module interface
const basket = {
  // state
  get state() {
    return stateGetter();
  },

  // getters (wrapped as real getters)
  get items() {
    return itemsGetter();
  },
  get numberOfItems() {
    return numberOfItemsGetter();
  },

  // mutations
  commitAppendItem: b.commit(appendItem),
  commitSetIsLoading: b.commit(setIsLoading),

  // actions
  dispatchRestoreSavedBasket: b.dispatch(restoreSavedBasket),
};

export default basket;
