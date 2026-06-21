import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./index.css"

import Home from "./pages/Home"
import AppSemana4 from "../../Semana 4/src/App.jsx"
import AppSemana5 from "../../Semana 5/src/App.jsx"
import NotFound from "./pages/NotFound"

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/semana4" element={<AppSemana4 />} />
                <Route path="/semana5" element={<AppSemana5 />} />

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp