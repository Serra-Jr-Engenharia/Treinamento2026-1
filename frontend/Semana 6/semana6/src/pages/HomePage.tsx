import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-8 bg-white">
      <img src="/Logo.png" alt="Logo Serra Jr" className="h-20 w-auto mb-6" />
      <h2 className="text-4xl font-bold text-[#001830] mb-3">Bem-vindo!</h2>
      <p className="text-gray-500 text-lg mb-16">Escolha uma seção para explorar.</p>

      <div className="flex flex-wrap gap-10 justify-center">
        <Link
          to="/equipe"
          className="bg-[#001830] text-white rounded-2xl p-10 flex flex-col items-center gap-3 shadow-lg hover:scale-105 transition-transform"
          style={{ width: '260px' }}
        >
          <h3 className="text-2xl font-bold">Equipe</h3>
          <p className="text-sm text-center opacity-70">Conheça os membros da equipe Serra Jr</p>
          <span className="mt-2 px-5 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#FF6600' }}>
            Ver equipe
          </span>
        </Link>

        <Link
          to="/filmes"
          className="bg-[#001830] text-white rounded-2xl p-10 flex flex-col items-center gap-3 shadow-lg hover:scale-105 transition-transform"
          style={{ width: '260px' }}
        >
          <h3 className="text-2xl font-bold">Filmes</h3>
          <p className="text-sm text-center opacity-70">Pesquise filmes usando a base OMDB</p>
          <span className="mt-2 px-5 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#FF6600' }}>
            Buscar filmes
          </span>
        </Link>
      </div>
    </div>
  )
}
