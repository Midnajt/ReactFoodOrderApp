import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // ... update the state to add a meal item
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id); // sprawdzi czy taki item jest juz w state

    const updatedItems = [...state.items]; // zrobi kobie obecnego stanu

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem, //znajdzie istniejacy juz item
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    // ... remove an item from the state
  }

  return state;
}

export function CartContextProvider({ children }) {
  useReducer(cartReducer, { items: [] });

  return <CartContext.Provider>{children}</CartContext.Provider>;
}

export default CartContext;
