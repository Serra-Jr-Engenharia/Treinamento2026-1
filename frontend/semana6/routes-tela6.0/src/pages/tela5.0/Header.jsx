import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="bg-[#001830] flex  py-4 w-full ">
        <div className="gap-6 px-7 w-full max-w-[1366px] flex items-center ">  

          <Link to="/"className="text-white hover:text-gray-300 transition-colors flex items-center p-2 hover:bg-white/10 rounded-full"
            title="Voltar para a Home">
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

        <h1 className="text-white text-[36px] font-bold">
            Lista de Filmes
        </h1>
        </div>  
    </header>  
  )
}

export default Header