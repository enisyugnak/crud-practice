import ProductsPage from './components/products/ProductsPage';
import Home from './components/Home';
import NavBar from './components/NavBar';
/** routes */
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <header className="header">
        <NavBar />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;
