import React, { useState } from 'react';
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const App = () => {
  const initialProducts = [
    { id: 1, name: 'Product A', price: 10 },
    { id: 2, name: 'Product B', price: 20 },
    { id: 3, name: 'Product C', price: 30 },
  ];

  const [cartItems, setCartItems] = useState([]);

  const addToCart = product => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = itemToRemove => {
    setCartItems(cartItems.filter(item => item.id !== itemToRemove.id));
  };

  return (
    <div>
      <ProductList products={initialProducts} addToCart={addToCart} />
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;
