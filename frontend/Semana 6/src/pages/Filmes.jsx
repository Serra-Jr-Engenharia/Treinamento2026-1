import '../styles/filmes.css'

import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'

import axios from 'axios'

import { useState } from 'react'

export default function Filmes() {

const [search, setSearch] = useState('')

const [movies, setMovies] = useState([])

const [ultimos, setUltimos] = useState([])

async function buscarFilmes(valor = search) {

if (!valor) return

try {

const resposta =
await axios.get(
`https://www.omdbapi.com/?apikey=9e4fc2cd&s=${valor}`
)

if (
resposta.data.Response === 'True'
) {

setMovies(
resposta.data.Search
)

setUltimos((lista) => {

const novaLista = [

valor,

...lista.filter(
item =>
item !== valor
)

]

return novaLista.slice(0, 5)

})

}

else {

setMovies([])

alert(
resposta.data.Error
)

}

}

catch {

alert(
'Erro ao buscar'
)

}

}

return (

<div className="container">

<header className="header">

<h1>

Lista de Filmes

</h1>

</header>

<SearchBar
search={search}
setSearch={setSearch}
buscarFilmes={buscarFilmes}
ultimos={ultimos}
/>

<div className="movies">

{

movies.map(
(movie) => (

<MovieCard
key={movie.imdbID}
movie={movie}
/>

)

)

}

</div>

<footer className="footer">

COPYRIGHT © 2026 - SERRA JUNIOR ENGENHARIA

</footer>

</div>

)

}