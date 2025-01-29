// hooks/useFetchProducts.ts

import { useState, useEffect } from 'react';

// Mendefinisikan tipe data untuk product
interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

// Custom hook untuk mengambil data produk
const useFetchProducts = () => {
  // State untuk menyimpan daftar produk
  const [products, setProducts] = useState<Product[]>([]);

  // State untuk menyimpan status loading
  const [loading, setLoading] = useState<boolean>(true);

  // State untuk menyimpan pesan error jika terjadi kesalahan
  const [error, setError] = useState<string>('');

  // Mengambil data produk saat komponen pertama kali dimuat
  useEffect(() => {
    // Fungsi untuk mengambil data produk dari API
    const fetchProducts = async () => {
      try {
        // Mengambil data dari API (FakeStoreAPI)
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        // Menyimpan data produk yang berhasil diambil ke dalam state
        setProducts(data);

        // Mengubah status loading menjadi false setelah data diterima
        setLoading(false);
      } catch (err) {
        // Menangani jika terjadi error saat mengambil data
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    // Menjalankan fungsi fetchProducts saat pertama kali komponen dimuat
    fetchProducts();
  }, []); // [] sebagai dependency array, artinya hanya dijalankan sekali saat komponen pertama kali dimuat

  // Mengembalikan state products, loading, dan error agar bisa digunakan oleh komponen lain
  return { products, loading, error };
};

export default useFetchProducts;

/*
Penjelasan Alur:
State:

products: Menyimpan data produk yang diambil dari API.
loading: Menyimpan status apakah data sedang diambil atau tidak.
error: Menyimpan pesan error jika terjadi kesalahan saat mengambil data.
useEffect:

Digunakan untuk menjalankan efek samping (side effect) ketika komponen pertama kali dimuat. Di sini kita memanggil API untuk mengambil data produk.
fetchProducts: Fungsi asinkron untuk mengambil data produk dari API (https://fakestoreapi.com/products). Jika berhasil, data produk disimpan dalam state products, dan status loading diubah menjadi false. Jika gagal, error akan diset dan loading diubah menjadi false.
Return:

Custom hook ini mengembalikan tiga variabel: products, loading, dan error. Ini memungkinkan komponen yang menggunakan hook ini untuk mengakses data produk, status loading, dan pesan error jika terjadi kesalahan.
*/
