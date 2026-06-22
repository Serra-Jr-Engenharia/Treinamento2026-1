import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './src/pages/Home';
import Equipe from './src/pages/Equipe';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/equipe" element={<Equipe/>} />
            </Routes>       
        </BrowserRouter>
    )
}

export default RoutesApp;