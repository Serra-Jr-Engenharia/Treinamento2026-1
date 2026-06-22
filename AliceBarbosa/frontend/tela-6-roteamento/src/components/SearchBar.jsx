export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex justify-center mt-8 w-full px-4">
      <input 
        type="text" 
        placeholder="Nome do filme..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full max-w-4xl px-6 py-3 rounded-full border-2 border-serra-orange focus:outline-none focus:ring-2 focus:ring-serra-orange shadow-sm text-lg text-black"
      />
      <button 
        onClick={onSearch}
        className="ml-4 bg-serra-orange text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors shadow-md"
      >
        Pesquisar
      </button>
    </div>
  );
}