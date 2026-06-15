import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (searchTerm.trim()) {
      onSearch(searchTerm); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-center gap-4">
      
      <input
        type="text"
        placeholder="Nome do filme..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-[48px] px-6 border-2 border-[#FF6600] rounded-full text-gray-700 bg-white placeholder-[#9B9B9B] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] font-medium text-base"
      />
      
      <button
        type="submit"
        className="w-full sm:w-[266px] h-[48px] flex items-center justify-center bg-[#FF6600] text-white rounded-full font-medium text-lg hover:bg-[#e05e00] transition-colors shadow-sm cursor-pointer"
      >
        Pesquisar
      </button>
    </form>
  );
}