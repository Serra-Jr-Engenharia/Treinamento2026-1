import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes' // Importa o seu arquivo de rotas
import './index.css'; // Importa o Tailwind e estilos globais

// Busca a div com id "root" no HTML e renderiza as rotas dentro dela
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
)