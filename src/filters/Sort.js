import React from 'react';

const Sort = ({ onSort }) => (
  <div className="sort">
    <label>
      Sort by:
      <select onChange={e => onSort(e.target.value)}>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </label>
  </div>
);

export default Sort;