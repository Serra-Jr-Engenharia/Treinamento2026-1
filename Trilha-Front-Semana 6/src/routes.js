import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tela4 from "./Pages/Tela_4/App";
import Tela5 from "./Pages/Tela_5/App";
import Erro from "./Pages/Tela_Erro/erro";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tela4 />} />
        <Route path="/Tela5" element={<Tela5 />} />


         <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
