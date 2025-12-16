import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(produto) {
    const exists = cart.find(item => item.id === produto.id);

    if (exists) {
      setCart(cart.map(item =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...produto, quantidade: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter(item => item.id !== id));
  }

  function updateQuantity(id, quantidade) {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantidade } : item
    ));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
