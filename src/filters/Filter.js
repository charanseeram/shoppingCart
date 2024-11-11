import React from 'react';

const Filter = ({ onFilter }) => (
  <div className="filter">
    <label>
      Category:
      <select onChange={e => onFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
      </select>
    </label>
  </div>
);

export default Filter;