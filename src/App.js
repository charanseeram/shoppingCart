import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetails';
import CategoryPage  from './components/CategoryPage ';
import Filter from './filters/Filter';
import Sort from './filters/Sort';
import SearchBar from './filters/SearchBar';
import LoadingIndicator from './utils/LoadingIndicator';
import ErrorMessage from './utils/ErrorMessage';
import ProductDetails from './components/ProductDetails';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>VENIA</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/women">Women</Link>
            <Link to="/men">Men</Link>
            <Link to="/accessories">Accessories</Link>
          </nav>
          <div className="cart-icon">🛒</div>
        </header>
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <div className="filters">
                  <SearchBar onSearch={(query) => console.log(query)} />
                  <Filter />
                  <Sort />
                </div>
                <div className="product-list">
                  {loading && <LoadingIndicator />}
                  {error && <ErrorMessage message={error} />}
                  {!loading && !error && <ProductList products={products} />}
                </div>
              </>
            } />
            <Route path="/women" element={<CategoryPage products={products} category="women's clothing" />} />
            <Route path="/men" element={<CategoryPage products={products} category="men's clothing" />} />
            <Route path="/accessories" element={<CategoryPage products={products} category="jewelery" />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;