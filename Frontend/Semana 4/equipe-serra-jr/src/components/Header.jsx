export default function Header() {
  return (
    <header className="bg-orange-500 h-20 flex items-center px-8">
      <div className="flex items-center gap-3 text-white">
        <img
          src="/Logo.png"
          alt="Logo da Serra Jr"
          className="w-10 h-10"
        />

        <h1 className="text-3xl font-bold">
          Equipe Serra Jr
        </h1>
      </div>
    </header>
  );
}