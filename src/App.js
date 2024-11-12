import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoadingIndicator from './utils/LoadingIndicator';
import ErrorMessage from './utils/ErrorMessage';

const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const CategoryPage = lazy(() => import('./components/CategoryPage'));
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

  const onFilter = (category) => {
    if (category === 'All') {
      setDisplayedProducts(products.slice(0, 10));
    } else {
      const filteredProducts = products.filter(product => product.category === category);
      setDisplayedProducts(filteredProducts.slice(0, 10));
    }
  };

  const onSearch = (query) => {
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedProducts(filteredProducts.slice(0, 10));
  };

  const onSort = (sortOption) => {
    let sortedProducts = [...displayedProducts];
    switch (sortOption) {
      case 'Price: Low to High':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'Name: A to Z':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Name: Z to A':
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    setDisplayedProducts(sortedProducts);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">VENIA</h1>
          <nav className="App-nav">
            <Link to="/" className="App-link">Home</Link>
            <Link to="/category/men's clothing" className="App-link">Men</Link>
            <Link to="/category/women's clothing" className="App-link">Women</Link>
            <Link to="/category/jewelery" className="App-link">Jewelery</Link>
          </nav>
          <span role="img" aria-label="cart" className="App-cart">🛒</span>
        </header>
        <main className="App-main">
          <Suspense fallback={<LoadingIndicator />}>
            <Routes>
              <Route path="/" element={
                <>
                  <SearchBar onSearch={onSearch} className="App-searchbar" />
                  <Filter onFilter={onFilter} className="App-filter" />
                  <Sort onSort={onSort} className="App-sort" />
                  {loading && <LoadingIndicator className="App-loading" />}
                  {error && <ErrorMessage message={error} className="App-error" />}
                  {!loading && !error && <ProductList products={displayedProducts} className="App-productlist" />}
                  {!loading && !error && displayedProducts.length < products.length && (
                    <button onClick={handleLoadMore} className="App-loadmore">
                      {loadMore ? 'Loading...' : 'Load More'}
                    </button>
                  )}
                </>
              } />
              <Route path="/product/:id" element={<ProductDetails className="App-productdetails" />} />
              <Route path="/category/:name" element={<CategoryPage products={products} />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;