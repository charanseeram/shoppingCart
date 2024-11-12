import React from 'react';

const Sort = ({ onSort }) => (
  <select onChange={(e) => onSort(e.target.value)} className="sort-dropdown">
    <option value="Price: Low to High">Price: Low to High</option>
    <option value="Price: High to Low">Price: High to Low</option>
    <option value="Name: A to Z">Name: A to Z</option>
    <option value="Name: Z to A">Name: Z to A</option>
  </select>
);

export default Sort;