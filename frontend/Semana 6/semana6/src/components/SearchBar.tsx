interface Props {
  query: string
  setQuery: (q: string) => void
  onSearch: () => void
}

export default function SearchBar({ query, setQuery, onSearch }: Props) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder="Nome do filme..."
        className="flex-1 px-6 py-3 rounded-full border-2 outline-none text-gray-700 text-base"
        style={{ borderColor: '#FF6600' }}
      />
      <button
        onClick={onSearch}
        className="px-8 py-3 rounded-full text-white font-semibold text-base cursor-pointer transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#FF6600' }}
      >
        Pesquisar
      </button>
    </div>
  )
}
