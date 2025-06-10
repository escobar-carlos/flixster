import MovieCard from "./MovieCard"

function MovieList({ movieData }) {

  return (
    <>
    <div id="movie-list">
    {
      movieData.map(movie => {
        let image = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        return <MovieCard image={image} title={movie.title} rating={movie.vote_average}/>
      })
    }
    </div>
    </>
  )
}

export default MovieList