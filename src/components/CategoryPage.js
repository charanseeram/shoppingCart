import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from './ProductList';

const CategoryPage = ({ products }) => {
  const { name } = useParams();
  console.log('Category:', name); // Log the category name
  console.log('Products:', products); // Log the products

  const filteredProducts = products.filter(product => product.category.toLowerCase() === name.toLowerCase());
  console.log('Filtered Products:', filteredProducts); // Log the filtered products

  return (
    <div className="category-page">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default CategoryPage;