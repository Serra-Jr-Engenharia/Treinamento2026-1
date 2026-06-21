import logoSerra from './assets/logo-serra.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-[#ff6600] flex justify-center py-4 w-full relative">
        
        <Link 
          to="/" 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors flex items-center p-2 hover:bg-white/10 rounded-full"
          title="Voltar para a Home"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>

        <div className="gap-6 px-7 w-full max-w-[1366px] flex items-center"> 
          <img 
              src={logoSerra} 
              alt="Logo Equipe Serra Jr" 
              className="w-[58px] h-[57px]" 
          />
          <h1 className="text-white text-[36px] font-bold">
              Equipe Serra Jr
          </h1>
        </div>  
        
    </header>  
  )
}

export default Header