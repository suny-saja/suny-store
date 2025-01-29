// Import library dan komponen yang dibutuhkan
import * as React from 'react';
import { useSearch } from '../Context/searchContext'; // Mengambil searchQuery dari Context pencarian
import { CardProduct } from '../ui/CardProduct/CardProduct'; // Komponen untuk menampilkan setiap produk
import { useCart } from '../Context/cartContext'; // Mengambil fungsi addToCart untuk menambahkan produk ke keranjang
import { useLocation } from 'react-router-dom'; // Mengambil informasi URL untuk mendapatkan query pencarian
import styles from './SearchPage.module.scss'; // Import file styling untuk halaman pencarian
import { useEffect, useState } from 'react';

// Interface untuk tipe data produk
interface Product {
  id: number; // ID unik produk
  title: string; // Nama produk
  price: string; // Harga produk
  category: string; // Kategori produk
  description: string; // Deskripsi produk
  image: string; // URL gambar produk
}

// Komponen utama halaman pencarian
export const SearchPage: React.FC = () => {
  // Menyimpan data produk yang diambil
  const { cart, addToCart } = useCart(); // Mengambil data keranjang dan fungsi untuk menambah produk ke keranjang
  const [products, setProducts] = useState<Product[]>([]); // State untuk menyimpan produk yang diambil dari API
  const location = useLocation(); // Mengambil informasi URL saat ini
  const { searchQuery } = useSearch(); // Mengambil query pencarian yang ada di Context

  // Mengambil query parameter dari URL (contoh: ?query=iphone)
  const queryParams = new URLSearchParams(location.search); // Mengambil parameter query dari URL
  const query = queryParams.get('query') || searchQuery; // Ambil nilai query dari URL, atau fallback ke searchQuery di context

  // Mengambil data produk dari API menggunakan useEffect
  useEffect(() => {
    // Mengambil data produk dari API
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json()) // Mengubah response menjadi format JSONhttps://fs.tokopedia.net
      .then((data) => setProducts(data)) // Menyimpan data produk ke dalam state 'products'
      .catch((error) => console.error(error)); // Menangani error jika fetch gagal
  }, []); // Efek ini hanya dijalankan sekali saat komponen pertama kali dipasang

  // Filter produk berdasarkan query pencarian
  const filteredProducts = products.filter(
    (product) => product.title.toLowerCase().includes(query.toLowerCase()) // Menyaring produk yang judulnya mengandung query pencarian
  );

  // Render halaman pencarian
  return (
    <div className={styles.searchPage}>
      <header className={styles.header}>
        <h1>Search Results</h1> {/* Judul halaman */}
        <p>Showing results for: "{query}"</p>{' '}
        {/* Menampilkan kata kunci yang sedang dicari */}
      </header>

      <main className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Products</h2>{' '}
        {/* Judul bagian produk */}
        <div className={styles.productsGrid}>
          {/* Jika ada produk yang cocok dengan query pencarian */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <CardProduct
                key={product.id} // Menggunakan id produk sebagai key
                {...product} // Menyebarkan properti produk sebagai props untuk ProductCard
                onAddToCart={() => addToCart(product.id)} // Fungsi untuk menambah produk ke keranjang
              />
            ))
          ) : (
            // Jika tidak ada produk yang cocok, tampilkan pesan
            <p>No products found for "{query}"</p>
          )}
        </div>
      </main>
    </div>
  );
};

/*
Penjelasan Komponen dan Fungsionalitas:
Imports:

React: Digunakan untuk membuat komponen dan mengelola state.
useEffect dan useState: Hook dari React untuk mengambil data produk dan menyimpan hasilnya dalam state.
useSearch: Hook custom yang mengakses searchQuery dari context pencarian untuk mendapatkan kata kunci pencarian.
useCart: Hook custom untuk mengakses fungsi keranjang dan data keranjang (seperti addToCart).
useLocation: Hook dari react-router-dom untuk mengambil query string dari URL.
ProductCard: Komponen yang menampilkan informasi produk dalam bentuk kartu.
styles: File SCSS untuk styling halaman pencarian.
State dan Variabel:

products: State yang menyimpan daftar produk yang diambil dari API.
query: Nilai yang digunakan untuk pencarian produk. Ini bisa berasal dari URL atau dari context searchQuery.
filteredProducts: Daftar produk yang sudah difilter berdasarkan query.
useEffect:

useEffect digunakan untuk mengambil data produk dari API saat komponen pertama kali dipasang. Setelah data produk diambil, hasilnya disimpan dalam state products.
Filtering Produk:

Setelah produk diambil, kita melakukan filter berdasarkan kata kunci pencarian (query). Produk yang judulnya mengandung kata kunci tersebut akan ditampilkan.
Render Halaman:

Di dalam render, jika ada produk yang cocok dengan query, kita menampilkan produk dalam grid menggunakan komponen ProductCard. Jika tidak ada produk yang ditemukan, kita menampilkan pesan "No products found".
Untuk setiap produk, kita juga menambahkan fungsi onAddToCart yang memanggil fungsi addToCart dari context cartContext untuk menambah produk ke keranjang.
Penggunaan ProductCard:

Komponen ProductCard digunakan untuk menampilkan informasi produk seperti nama, harga, dan gambar produk.
Setiap produk juga memiliki tombol atau aksi untuk menambah produk ke keranjang.
Kesimpulan:
Halaman pencarian ini memungkinkan pengguna untuk mencari produk berdasarkan kata kunci yang dimasukkan di URL atau melalui context.
Produk yang sesuai dengan query akan ditampilkan dalam bentuk grid.
Pengguna dapat menambah produk ke keranjang belanja mereka langsung dari halaman pencarian.
*/
