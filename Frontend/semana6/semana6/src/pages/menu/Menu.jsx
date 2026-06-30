import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-[450px]">
        <h1 className="text-4xl font-bold text-center mb-2">
          Semana 6
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Escolha uma atividade
        </p>

        <div className="flex flex-col gap-4">

          <Link
            to="/tela4"
            className="bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700 transition"
          >
            📄 Tela 4
          </Link>

          <Link
            to="/tela5"
            className="bg-green-600 text-white py-3 rounded-lg text-center hover:bg-green-700 transition"
          >
            🎬 Tela 5
          </Link>

        </div>
      </div>
    </div>
  );
}