import { createContext, useContext, useState, ReactNode } from 'react';

// Mendefinisikan tipe data untuk context search
interface SearchContextType {
  searchQuery: string; // Query pencarian yang akan disimpan
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // Fungsi untuk memperbarui searchQuery
}

// Membuat context untuk search
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Custom hook untuk menggunakan SearchContext
export const useSearch = () => {
  // Mengambil context yang sudah dibuat
  const context = useContext(SearchContext);

  // Jika context tidak ditemukan, lempar error
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// Tipe untuk props yang diterima oleh SearchProvider
interface SearchProviderProps {
  children: ReactNode; // Komponen anak yang akan diberi context
}

// SearchProvider adalah komponen pembungkus (wrapper) untuk memberikan akses context ke seluruh komponen anak
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  // State untuk menyimpan query pencarian
  const [searchQuery, setSearchQuery] = useState('');

  return (
    // Menyediakan context kepada komponen anak
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

/*
Penjelasan Alur:
SearchContextType: Ini adalah tipe untuk context yang kita buat. Di sini, ada dua properti:

searchQuery: Merupakan string yang menyimpan query pencarian.
setSearchQuery: Fungsi untuk mengubah nilai searchQuery.
SearchContext: Context yang dibuat menggunakan createContext(). Context ini akan membagikan nilai searchQuery dan setSearchQuery ke seluruh komponen anak yang berada di dalam SearchProvider.

useSearch: Hook ini akan digunakan untuk mengakses context SearchContext. Jika hook digunakan di luar SearchProvider, maka akan melempar error, karena context tidak akan tersedia.

SearchProvider: Komponen ini berfungsi sebagai pembungkus yang menyediakan context ke seluruh komponen anaknya. Di dalamnya, state searchQuery dikelola menggunakan useState(), dan nilai ini serta fungsi setSearchQuery dibagikan melalui context.

Cara Penggunaan:
Komponen yang ingin mengakses searchQuery dan setSearchQuery dapat menggunakan hook useSearch setelah membungkus aplikasi mereka dengan SearchProvider.

*/
