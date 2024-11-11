// src/components/CategoryPage.js
import React from 'react';
import ProductList from './ProductList';

const CategoryPage = ({ products, category }) => {
  const filteredProducts = products.filter(product => product.category === category);

  return (
    <div>
      <h2>{category}</h2>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default CategoryPage;