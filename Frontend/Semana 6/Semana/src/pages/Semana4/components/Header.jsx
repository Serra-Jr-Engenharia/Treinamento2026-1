export default function Header() {
  return (
    <header className="bg-orange-500 h-[97px] flex items-center px-8">
      <div className="flex items-center gap-3 text-white">
        <img
          src="/Logo.png"
          alt="Logo da Serra Jr"
          className="w-[58px] h-[57px]"
        />

        <h1 className="text-[36px] font-bold">
          Equipe Serra Jr
        </h1>
      </div>
    </header>
  );
}