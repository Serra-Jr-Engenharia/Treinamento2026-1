import {
Routes,
Route,
Link
}
from 'react-router-dom'

import Equipe from './pages/Equipe'

import Filmes from './pages/Filmes'

function App(){

return(

<>

<nav className="menu">

<Link to="/">
Equipe
</Link>

<Link to="/filmes">
Filmes
</Link>

</nav>

<Routes>

<Route
path="/"
element={<Equipe />}
/>

<Route
path="/filmes"
element={<Filmes />}
/>

</Routes>

</>

)

}

export default App