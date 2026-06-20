import { NavLink, useLocation } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/filmes': 'Lista de Filmes',
  '/equipe': 'Equipe Serra Jr',
}

export default function Header() {
  const { pathname } = useLocation()
  const dark = pathname === '/filmes'
  const customTitle = pageTitles[pathname]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-semibold text-base transition-opacity ${
      isActive ? 'underline opacity-100' : 'opacity-75 hover:opacity-100'
    }`

  return (
    <header
      className="text-white py-4 px-8 flex items-center justify-between shadow-md"
      style={{ backgroundColor: dark ? '#001830' : '#f97316' }}
    >
      <div className="flex items-center gap-4">
        {customTitle ? (
          <h1 className="text-2xl font-bold">{customTitle}</h1>
        ) : (
          <>
            <img src="/Logo.png" alt="Logo Serra Jr" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold">Serra Jr</h1>
          </>
        )}
      </div>
      <nav className="flex gap-8">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/equipe" className={linkClass}>Equipe</NavLink>
        <NavLink to="/filmes" className={linkClass}>Filmes</NavLink>
      </nav>
    </header>
  )
}
