export default function MovieCard({
movie
}){

return(

<div className="card">

<img
src={
movie.Poster !== "N/A"
? movie.Poster
: "https://placehold.co/300x450"
}
/>

<h2>

{
movie.Title
}

</h2>

<p>

{
movie.Year
}

</p>

</div>

)

}