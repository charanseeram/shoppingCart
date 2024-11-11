import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoadingIndicator from './utils/LoadingIndicator';
import ErrorMessage from './utils/ErrorMessage';

const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const CategoryPage = lazy(() => import('./components/CategoryPage '));
const Filter = lazy(() => import('./filters/Filter'));
const Sort = lazy(() => import('./filters/Sort'));
const SearchBar = lazy(() => import('./filters/SearchBar'));

function App() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setDisplayedProducts(response.data.slice(0, 10)); // Load initial 10 products
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setLoadMore(true);
    setTimeout(() => {
      setDisplayedProducts(products.slice(0, displayedProducts.length + 10));
      setLoadMore(false);
    }, 1000); // Simulate network delay
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>VENIA</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/women">Women</Link>
            <Link to="/men">Men</Link>
            <Link to="/jewelery">Jewelery</Link>
          </nav>
          <div className="cart-icon">🛒</div>
        </header>
        <div className="main-content">
          <Suspense fallback={<LoadingIndicator />}>
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
                    {!loading && !error && <ProductList products={displayedProducts} />}
                    {!loading && !error && displayedProducts.length < products.length && (
                      <button onClick={handleLoadMore} disabled={loadMore}>
                        {loadMore ? 'Loading...' : 'Load More'}
                      </button>
                    )}
                  </div>
                </>
              } />
              <Route path="/women" element={<CategoryPage products={products} category="women's clothing" />} />
              <Route path="/men" element={<CategoryPage products={products} category="men's clothing" />} />
              <Route path="/jewelery" element={<CategoryPage products={products} category="jewelery" />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;