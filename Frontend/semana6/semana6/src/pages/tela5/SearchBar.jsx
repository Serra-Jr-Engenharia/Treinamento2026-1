function SearchBar({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) {
  return (
    <div className="flex mx-[45px] gap-[12px]">
      <input
        type="text"
        placeholder="Nome do filme..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          flex-1
          border-2
          border-[#FF6600]
          rounded-full
          pl-[15px]
          pt-[12px]
          pb-[12px]
          bg-white
          outline-none
        "
      />

      <button
        onClick={handleSearch}
        className="
          w-[266px]
          h-[48px]
          bg-[#FF6600]
          rounded-full
          text-white
          text-[24px]
          font-normal
          flex
          items-center
          justify-center
        "
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;