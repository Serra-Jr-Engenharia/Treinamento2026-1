import logo from "./LogoSerraJr1.png";

function Header() {
  return (
    <header className="h-[97px] bg-[#FF6600] flex items-center">
      <img
        src={logo}
        alt="Logo Serra"
        className="w-[58px] h-[57px] ml-[23px] mr-[25px]"
      />

      <p className="text-[24px] font-bold">Equipe Serra Jr</p>
    </header>
  );
}

export default Header;
