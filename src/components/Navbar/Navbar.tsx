import * as React from 'react';
import { useCart } from '../Context/cartContext'; // Mengambil data dari CartContext
import { useSearch } from '../Context/searchContext'; // Mengambil data dari SearchContext
import { useNavigate } from 'react-router-dom'; // Untuk navigasi ke halaman lain
import styles from './Navbar.module.scss';
import TokopediaHenry from '/src/assets/html.png'; // Logo yang digunakan di navbar
import { useState } from 'react';
// import { useState } from 'react';
// import ShoppingCart from './Navbar/ShoppingCart'; // Komponen keranjang belanja

export const Navbar: React.FC = () => {
  // Mengambil data keranjang dan fungsi dari CartContext
  const { cart } = useCart();
  // Mengambil searchQuery dan fungsi setSearchQuery dari SearchContext
  const { searchQuery, setSearchQuery } = useSearch();
  const [isCartOpen] = useState(false); // State untuk mengatur apakah dropdown keranjang terbuka atau tidak
  const navigate = useNavigate(); // Fungsi untuk melakukan navigasi ke halaman lain

  // Fungsi untuk toggle atau ubah status open/close dari dropdown keranjang
  // const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Fungsi untuk mengarahkan ke halaman Checkout
  const goToCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout'); // Navigasi ke halaman checkout jika ada item di keranjang
    } else {
      alert('Keranjang Anda kosong!'); // Tampilkan alert jika keranjang kosong
    }
  };

  // Fungsi untuk menangani perubahan input di search bar
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update searchQuery setiap kali input berubah
  };

  // Fungsi untuk menangani klik tombol pencarian
  const handleSearchClick = () => {
    // Pindah ke halaman pencarian jika tombol diklik
    navigate('/search');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo dan nama website */}
        <div className={styles.logo}>
          <img src={TokopediaHenry} alt='CyberShop' />
          <p>SUNY-SHOP</p>
        </div>

        {/* Kolom pencarian */}
        <div className={styles.searchBar}>
          <input
            type='text'
            placeholder='Search for products...'
            style={{ fontStyle: 'italic' }}
            value={searchQuery} // Menghubungkan input dengan nilai searchQuery
            onChange={handleSearchChange} // Update searchQuery saat input berubah
          />
          <button onClick={handleSearchClick}>Search</button>{' '}
          {/* Tombol untuk memulai pencarian */}
        </div>

        {/* Menu Navbar */}
        <div className={styles.menu}>
          <a href='#home' className={styles.menuItem}>
            Home
          </a>
          <a href='#categories' className={styles.menuItem}>
            Categories
          </a>

          {/* Ikon keranjang belanja */}
          <div className={styles.cartIcon} onClick={goToCheckout}>
            🛒
            <span className={styles.cartCount}>{cart.length}</span>{' '}
            {/* Menampilkan jumlah item dalam keranjang */}
          </div>
        </div>
      </div>

      {/* Dropdown keranjang, hanya muncul jika isCartOpen bernilai true */}
      {isCartOpen && (
        <div className={styles.cartDropdown}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p> // Menampilkan pesan jika keranjang kosong
          ) : (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>
                    1 x ${parseFloat(item.price).toFixed(2)}{' '}
                    {/* Menampilkan harga item */}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </nav>
  );
};
