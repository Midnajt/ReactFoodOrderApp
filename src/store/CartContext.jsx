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
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id); // sprawdzi czy taki item jest juz w state

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items]; // kopia obecnego stanu koszyka

    if (existingCartItem.quantity === 1) {
      // jezeli w koszyku jest jeden taki element
      updatedItems.splice(existingCartItemIndex, 1); //usuniecie 1 elementu z wskazanego indeksu
    } else {
      //pomniejszamy o 1
      //tworzymy nowy element opierajac sie na starym i zmniejszajac ilosc jego ilosc o 1
      const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 }; // aktualizowanie stanu o ilosc pomniejszona o 1
      updatedItems[existingCartItemIndex] = updatedItem; //aktualizujemy element
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  // z provier korzysta <App/> jako rodzic to pozostalych komponentow
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext; // z tego defaultowego eksportu korzystajac komponenty ktore zaciagaja context np mealitem. const CartContext zostal zadeklarowany na samej gorze
