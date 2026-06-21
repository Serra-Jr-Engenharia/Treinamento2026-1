import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-orange-500 h-[97px] flex items-center px-8">
      <div className="flex items-center gap-3 text-white">
        <img
          src="/Logo.png"
          alt="Logo da Serra Jr"
          className="w-[58px] h-[57px]"
        />

        <h1 className="text-[20px] font-bold flex gap-6 items-center justify-center">
          <Link to="/" className="hover:text-[#001830]">Home</Link>
          <Link to="/semana4" className="ml-6 hover:text-[#001830]">Semana 4</Link>
          <Link to="/semana5" className="ml-6 hover:text-[#001830]">Semana 5</Link>          
        </h1>
      </div>
    </header>
  );
}