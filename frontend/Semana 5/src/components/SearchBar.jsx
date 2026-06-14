import { useState } from 'react'

export default function SearchBar({

search,

setSearch,

buscarFilmes,

ultimos

}) {

const [

mostrar,

setMostrar

] = useState(false)

return (

<div className="search">

<div className="searchBox">

<input

type="text"

placeholder="Nome do filme..."

value={search}

onFocus={() =>
setMostrar(
true
)
}

onBlur={() =>

setTimeout(
() =>

setMostrar(
false
),

200

)

}

onChange={(e) =>

setSearch(
e.target.value
)

}

/>

{

mostrar &&

ultimos.length > 0 && (

<div className="dropdown">

{

ultimos.map(
(item) => (

<div

key={item}

className="item"

onClick={() => {

setSearch(
item
)

buscarFilmes(
item
)

}}

>

{item}

</div>

)

)

}

</div>

)

}

</div>

<button

onClick={() =>

buscarFilmes()

}

>

Pesquisar

</button>

</div>

)

}