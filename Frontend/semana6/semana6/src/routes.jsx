import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./pages/menu/Menu";
import Tela4 from "./pages/tela4/tela4";
import Tela5 from "./pages/tela5/tela5";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/tela4" element={<Tela4 />} />
        <Route path="/tela5" element={<Tela5 />} />
      </Routes>
    </BrowserRouter>
  );
}