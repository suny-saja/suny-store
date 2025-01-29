import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Digunakan untuk navigasi antar halaman
import { useCart } from '../Context/cartContext'; // Mengakses konteks cart untuk mendapatkan state dan aksi
import CheckoutForm from '../CheckoutForm/CheckoutForm'; // Komponen form checkout
import styles from './Checkout.module.scss'; // Import styling SCSS untuk halaman checkout

export const Checkout: React.FC = () => {
  // Mengambil data dari cartContext seperti cart items dan fungsi manipulasi cart
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // Untuk navigasi ke halaman lain
  const navigate = useNavigate();

  // State untuk menampilkan atau menyembunyikan form checkout
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  // Redirect jika cart kosong
  if (cart.length === 0) {
    navigate('/'); // Mengarahkan pengguna ke halaman utama jika cart kosong
  }

  // Fungsi untuk menampilkan form checkout
  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  // Fungsi untuk menangani pengiriman form checkout
  const handleSubmit = () => {
    alert('Checkout successful! Thank you for your purchase.');
    clearCart(); // Mengosongkan keranjang setelah checkout
    navigate('/'); // Mengarahkan pengguna kembali ke halaman utama setelah checkout
  };

  return (
    <div className={styles.checkoutPage}>
      {/* Header bagian atas halaman */}
      <header className={styles.header}>
        <h2>Keranjang Belanja</h2>
      </header>

      {/* Jika cart tidak kosong, tampilkan item cart */}
      {cart.length > 0 ? (
        <>
          {/* Daftar item yang ada di cart */}
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  {/* Menampilkan harga item dengan format Rp */}
                  <p className={styles.itemPrice}>
                    Rp {parseFloat(item.price).toLocaleString()}
                  </p>
                  <div className={styles.quantityControls}>
                    {/* Tombol untuk mengurangi jumlah */}
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    {/* Menampilkan jumlah item dalam cart */}
                    <span className={styles.quantity}>{item.quantity}</span>
                    {/* Tombol untuk menambah jumlah */}
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Tombol untuk menghapus item dari cart */}
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Footer dengan total harga dan tombol checkout */}
          <div className={styles.footer}>
            <div className={styles.totalPrice}>
              <p>Total Harga:</p>
              {/* Menampilkan total harga dari semua item di cart */}
              <h3>
                Rp{' '}
                {cart
                  .reduce(
                    (total, item) =>
                      total + parseFloat(item.price) * item.quantity,
                    0
                  ) // Menghitung total harga
                  .toLocaleString()}{' '}
                {/* Format harga agar sesuai dengan format Indonesia */}
              </h3>
            </div>

            {/* Jika form checkout belum ditampilkan, tampilkan tombol checkout */}
            {!showCheckoutForm ? (
              <button
                onClick={handleCheckout}
                className={styles.checkoutButton}
              >
                Checkout
              </button>
            ) : (
              // Jika form checkout sudah ditampilkan, tampilkan CheckoutForm
              <CheckoutForm onSubmit={handleSubmit} />
            )}
          </div>
        </>
      ) : (
        // Jika cart kosong, tampilkan pesan
        <p className={styles.emptyCartMessage}>
          Keranjang Anda kosong. Silakan tambahkan produk untuk melanjutkan.
        </p>
      )}
    </div>
  );
};
/*
Penjelasan Alur:
State dan fungsi yang digunakan:

showCheckoutForm: State yang digunakan untuk menampilkan atau menyembunyikan form checkout.
handleCheckout: Fungsi yang akan menampilkan form checkout ketika tombol "Checkout" diklik.
handleSubmit: Fungsi yang dijalankan ketika form checkout disubmit, menampilkan alert bahwa checkout berhasil, mengosongkan cart, dan mengarahkan pengguna ke halaman utama.
Navigasi dan Redirect:

Jika cart kosong, pengguna langsung diarahkan ke halaman utama menggunakan navigate("/").
Cart Item List:

Di bagian cart items, setiap item di-render dengan gambar, judul, harga, serta kontrol untuk mengubah jumlah (menambah atau mengurangi).
Ada juga tombol untuk menghapus item dari cart.
Footer:

Di bagian footer, total harga dihitung berdasarkan jumlah dan harga setiap item di cart.
Jika form checkout belum tampil, tombol "Checkout" akan muncul. Jika form checkout sudah ditampilkan, maka form tersebut akan muncul.
Pesan Keranjang Kosong:
*/
