import logoSerra from '../assets/logo-serra.png'

function Header() {
  return (
    <header className="bg-[#ff6600] flex justify-center py-4 w-full">
      <div className="flex items-center gap-6 w-full max-w-[1366px] px-7">

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