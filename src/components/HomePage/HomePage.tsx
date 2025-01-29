import * as React from 'react';
import styles from './HomePage.module.scss'; // Import styling SCSS untuk halaman utama
import { Navbar } from '../Navbar/Navbar'; // Import komponen Navbar
import useFetchProducts from '../hooks/useFetchProducts'; // Hook untuk mengambil data produk
import { useCart } from '../Context/cartContext'; // Mengakses konteks cart untuk mendapatkan fungsi menambah produk ke keranjang
import { toast, ToastContainer } from 'react-toastify'; // Import toast untuk notifikasi
import 'react-toastify/dist/ReactToastify.css'; // Import CSS untuk toast notifications
import { CardProduct } from '../ui/CardProduct/CardProduct';

export const Homepage: React.FC = () => {
  // Mengambil data produk dan status loading/error dari hook useFetchProducts
  const { products, loading, error } = useFetchProducts();
  // Mengambil fungsi addToCart dari cartContext
  const { addToCart } = useCart();

  // Fungsi untuk menangani penambahan produk ke keranjang
  const handleAddToCart = (product: any) => {
    addToCart(product); // Menambahkan produk ke keranjang
    // Menampilkan notifikasi toast ketika produk berhasil ditambahkan ke keranjang
    toast.success(`${product.title} has been added to your cart!`, {
      position: 'top-center', // Menampilkan toast di posisi atas tengah
      autoClose: 3000, // Menutup toast otomatis setelah 3 detik
      hideProgressBar: true, // Menyembunyikan progress bar
      closeOnClick: true, // Menutup toast ketika diklik
      pauseOnHover: true, // Menjeda animasi ketika toast di-hover
    });
  };

  // Jika produk masih dalam proses loading, tampilkan loading message
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Jika terjadi error saat mengambil data, tampilkan pesan error
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.homepage}>
      {/* Navbar yang ada di halaman utama */}
      <Navbar />

      {/* Header halaman utama */}
      <header className={styles.header}>
        <h1>
          Welcome to <span>Suny-Shop</span>
        </h1>
        <p>The ultimate destination for your shopping needs.</p>
      </header>

      {/* Konten utama halaman */}
      <main className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.productsGrid}>
          {/* Mapping setiap produk untuk ditampilkan dalam bentuk card */}
          {products
            .slice(0)
            .reverse()
            .map((product: any) => (
              <CardProduct
                key={product.id} // Gunakan ID produk sebagai key
                {...product} // Spread operator untuk meneruskan semua properti produk
                onAddToCart={() => handleAddToCart(product)} // Fungsi yang dipanggil saat tombol "Add to Cart" diklik
              />
            ))}
        </div>
      </main>

      {/* Footer halaman */}
      <footer className={styles.footer}>
        <p>&copy; 2025 SUNY-SHOP. All rights reserved.</p>
      </footer>

      {/* Komponen ToastContainer untuk menampilkan notifikasi toast */}
      <ToastContainer />
    </div>
  );
};

/*
Penjelasan Fungsionalitas:
Mengambil Produk:

Menggunakan hook useFetchProducts untuk mengambil data produk dari API. Terdapat state loading dan error untuk menangani status pengambilan data.
Jika produk masih dalam proses loading, tampilkan pesan "Loading products...".
Jika ada error dalam pengambilan data, tampilkan pesan error.
Menambahkan Produk ke Keranjang:

Fungsi handleAddToCart dipanggil ketika tombol "Add to Cart" diklik pada setiap produk. Fungsi ini menambahkan produk ke dalam keranjang menggunakan addToCart dari konteks cartContext.
Setelah produk berhasil ditambahkan, toast.success digunakan untuk menampilkan notifikasi toast yang memberi tahu pengguna bahwa produk telah berhasil ditambahkan ke keranjang.
Menampilkan Produk:

Menggunakan komponen ProductCard untuk menampilkan daftar produk yang diambil dari API. Setiap produk dipetakan (map) dan diteruskan ke ProductCard dengan properti produk.
Struktur Halaman:

Halaman dibagi menjadi beberapa bagian: Navbar, header, mainContent, dan footer.
Di bagian mainContent, produk-produk ditampilkan dalam bentuk grid menggunakan products.map.
Toast Notifications:

ToastContainer adalah komponen dari react-toastify yang diperlukan untuk menampilkan notifikasi toast. Notifikasi ini ditampilkan ketika pengguna berhasil menambahkan produk ke keranjang.
*/
