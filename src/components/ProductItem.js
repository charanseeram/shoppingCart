// src/components/ProductItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';

const ProductItem = ({ product }) => (
  <div className="product-item">
    <Link to={`/product/${product.id}`}>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>${product.price}</p>
    </Link>
  </div>
);

export default ProductItem;