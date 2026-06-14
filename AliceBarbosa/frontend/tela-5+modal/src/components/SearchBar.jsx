export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="w-full max-w-[1283px] mx-auto flex flex-col md:flex-row gap-4 mt-8 px-4">
      <input
        type="text"
        placeholder="Nome do filme..."
        className="flex-1 h-[48px] rounded-[22px] border-2 border-serra-orange px-6 outline-none focus:ring-2 focus:ring-serra-orange/50 text-gray-700"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <button
        onClick={onSearch}
        className="h-[48px] px-12 bg-serra-orange text-white font-bold rounded-[22px] hover:bg-orange-600 transition-colors cursor-pointer"
      >
        Pesquisar
      </button>
    </div>
  );
}