import logoSerra from './assets/logo-serra2.png'


function Header() {
  return (
    <header className="bg-[#001830] flex  py-4 w-full ">
        <div className="gap-6 px-7 w-full max-w-[1366px] flex items-center ">  
     
        <img 
            src={logoSerra} 
            alt="Logo Equipe Serra Jr" 
            className="w-[58px] h-[57px]" 
        />

        <h1 className="text-white text-[36px] font-bold">
            Serra Jr.
        </h1>
        </div>  
    </header>  
  )
}

export default Header