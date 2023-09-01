import React from 'react';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="shadow-md p-4 rounded-md max-w-md mx-auto bg-bgcolor mt-8">
      <h2 className="text-xl font-bold text-center mb-4">Product List</h2>
      {products.map(product => (
        <div key={product.id} className="flex flex-row items-center  justify-between px-8">
          <h3 className="text-lg font-bold pr-8 ">{product.name}</h3>
          <p className="text-lg font-bold pr-8">${product.price}</p>
          <button className=" font-bold px-4 py-2 rounded-md shadow-md hover:bg-accent-dark hover:text-accent transition duration-200 mb-2 bg-success" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
