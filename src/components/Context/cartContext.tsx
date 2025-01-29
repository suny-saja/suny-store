import { createContext, useContext, useReducer, ReactNode } from 'react';

// Definisi tipe untuk product (produk) yang ada di keranjang
interface Product {
  id: number; // ID produk
  title: string; // Nama produk
  price: string; // Harga produk
  category: string; // Kategori produk
  description: string; // Deskripsi produk
  image: string; // URL gambar produk
}

// CartItem adalah produk di keranjang yang sudah memiliki quantity (jumlah produk)
interface CartItem extends Product {
  quantity: number; // Jumlah produk di keranjang
}

// CartState adalah tipe data untuk menyimpan semua item di keranjang
interface CartState {
  items: CartItem[]; // List item yang ada di keranjang
}

// CartAction adalah jenis aksi yang bisa dilakukan untuk mengubah data di cart (keranjang)
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product } // Tambahkan produk ke keranjang
  | { type: 'REMOVE_FROM_CART'; payload: number } // Hapus produk berdasarkan id
  | { type: 'CLEAR_CART' } // Hapus semua produk di keranjang
  | { type: 'INCREASE_QUANTITY'; payload: number } // Tambah jumlah produk berdasarkan id
  | { type: 'DECREASE_QUANTITY'; payload: number }; // Kurangi jumlah produk berdasarkan id

// Reducer adalah fungsi yang mengubah state berdasarkan aksi yang diterima
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Cek apakah produk sudah ada di keranjang
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      // Kalau sudah ada, tinggal tambah quantity-nya
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 } // Tambah quantity produk
              : item
          ),
        };
      }

      // Kalau belum ada, tambahkan produk ke keranjang dengan quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }], // Produk baru ditambah ke keranjang
      };
    }

    case 'REMOVE_FROM_CART': {
      // Menghapus produk berdasarkan id dari keranjang
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload), // Hapus produk dengan id yang sesuai
      };
    }

    case 'CLEAR_CART': {
      // Kosongkan semua produk dalam keranjang
      return { items: [] };
    }

    case 'INCREASE_QUANTITY': {
      // Menambah jumlah produk berdasarkan id
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 } // Tambah 1 ke quantity produk
            : item
        ),
      };
    }

    case 'DECREASE_QUANTITY': {
      // Mengurangi jumlah produk, pastikan quantity-nya tidak kurang dari 1
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 } // Kurangi 1 jika quantity > 1
              : item
          )
          .filter((item) => item.quantity > 0), // Pastikan tidak ada produk yang quantity-nya 0 atau kurang
      };
    }

    default:
      // Kalau ada aksi yang tidak dikenali, tampilkan error
      throw new Error(`Unhandled action type: ${(action as CartAction).type}`);
  }
};

// CartContextProps mendefinisikan apa saja yang tersedia di Context untuk keranjang
interface CartContextProps {
  cart: CartItem[]; // Semua item yang ada di keranjang
  addToCart: (product: Product) => void; // Fungsi untuk menambah produk ke keranjang
  removeFromCart: (id: number) => void; // Fungsi untuk menghapus produk dari keranjang
  clearCart: () => void; // Fungsi untuk mengosongkan keranjang
  increaseQuantity: (id: number) => void; // Fungsi untuk menambah jumlah produk
  decreaseQuantity: (id: number) => void; // Fungsi untuk mengurangi jumlah produk
}

// Membuat Context untuk menyimpan data keranjang yang bisa diakses di seluruh aplikasi
const CartContext = createContext<CartContextProps | undefined>(undefined);

// CartProvider adalah komponen yang menyediakan data dan fungsi terkait keranjang untuk aplikasi
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Menggunakan useReducer untuk mengelola state keranjang
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Fungsi untuk menambah produk ke keranjang
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product }); // Kirim aksi untuk menambah produk
  };

  // Fungsi untuk menghapus produk dari keranjang berdasarkan id
  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id }); // Kirim aksi untuk menghapus produk
  };

  // Fungsi untuk mengosongkan semua produk dalam keranjang
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' }); // Kirim aksi untuk menghapus semua produk
  };

  // Fungsi untuk menambah jumlah produk dalam keranjang
  const increaseQuantity = (id: number) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id }); // Kirim aksi untuk menambah jumlah produk
  };

  // Fungsi untuk mengurangi jumlah produk dalam keranjang
  const decreaseQuantity = (id: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id }); // Kirim aksi untuk mengurangi jumlah produk
  };

  // Memberikan akses ke nilai cart dan fungsi-fungsi terkait cart untuk komponen lainnya
  return (
    <CartContext.Provider
      value={{
        cart: state.items, // Berikan data keranjang
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children} {/* Menyediakan CartContext ke seluruh komponen anak */}
    </CartContext.Provider>
  );
};

// Hook custom untuk menggunakan CartContext di komponen lain
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider'); // Pastikan hook hanya digunakan dalam CartProvider
  }
  return context; // Kembalikan context yang berisi data dan fungsi terkait cart
};

/*
Penjelasan singkat:
CartProvider: Komponen ini menyediakan semua data dan fungsi terkait keranjang belanja (add, remove, clear, update quantity) untuk bisa diakses oleh komponen lain dalam aplikasi.
Reducer: cartReducer adalah fungsi untuk mengubah state keranjang berdasarkan aksi yang dikirim, seperti menambah produk, menghapus produk, atau mengubah jumlah produk.
useCart: Hook ini memungkinkan komponen untuk mengakses state dan fungsi keranjang secara mudah tanpa harus mengambil context langsung.
*/
