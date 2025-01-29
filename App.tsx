import { Homepage } from './components/HomePage/HomePage';
import { Checkout } from './components/CheckOut/Checkout';
import { SearchPage } from './components/SearchPage/SearchPage';
import { CartProvider } from './components/Context/cartContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { SearchProvider } from './components/Context/searchContext';

function App() {
  return (
    <>
      <CartProvider>
        <SearchProvider>
          {' '}
          {/* Bungkus seluruh aplikasi dengan SearchProvider */}
          <Routes>
            <Route path='/' Component={Homepage} />
            <Route path='/checkout' Component={Checkout} />
            <Route path='/search' Component={SearchPage} />{' '}
          </Routes>
          {/* Route untuk halaman pencarian */}
        </SearchProvider>
      </CartProvider>
    </>
  );
}

export default App;
