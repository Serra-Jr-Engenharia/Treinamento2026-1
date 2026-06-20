import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EquipePage from './pages/EquipePage'
import FilmesPage from './pages/FilmesPage'

function Layout() {
  const { pathname } = useLocation()
  const dark = pathname === '/filmes'

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/equipe" element={<EquipePage />} />
          <Route path="/filmes" element={<FilmesPage />} />
        </Routes>
      </main>
      <Footer dark={dark} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
