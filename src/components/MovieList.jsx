import MovieCard from "./MovieCard"
import './MovieList.css'

function MovieList({ movieData, favoritedMovies, watchedMovies, onMovieClick, onButtonClick }) {
  const { updateSelectedMovieData, setIsOpen } = onMovieClick;
  const { updateFavoritedMovies, updateWatchedMovies } = onButtonClick;
  return (
    <>
    <div id="movie-list">
    {
      movieData.map(movie => {
        
        let image = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        return <MovieCard image={image} title={movie.title} rating={movie.vote_average} id={movie.id} updateSelectedMovieData={updateSelectedMovieData} setIsOpen={setIsOpen} updateFavoritedMovies={updateFavoritedMovies} updateWatchedMovies={updateWatchedMovies} isFavorited={favoritedMovies.includes(movie)} isWatched={watchedMovies.includes(movie)}/>
      })
    }
    </div>
    </>
  )
}

export default MovieList