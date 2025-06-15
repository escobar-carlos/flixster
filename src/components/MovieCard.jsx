import './MovieCard.css'

function MovieCard({ image, title, rating, id, updateModalData, updateFavoritedMovies, updateWatchedMovies, isFavorited, isWatched }) {

  // Load API key from environment variable
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const handleCardClick = async () => {

    try {
      // Get data about movie that was clicked
      let modalMovieData = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
      let modalMovie = await modalMovieData.json();
      // Get backdrop image
      let backdrop = `https://image.tmdb.org/t/p/original/${modalMovie.backdrop_path}`;
      // Get genres in readable format
      let genres = modalMovie.genres.map(genre => genre.name).join(', ');
      // Get trailer
      let movieVideosData = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`);
      let movieVideos = await movieVideosData.json();
      let movieTrailer = movieVideos.results.find(trailer => trailer.type == 'Trailer');
      let movieTrailerLink = movieTrailer ? `https://www.youtube.com/embed/${movieTrailer.key}` : null;
  
      const modalMovieInfo = {
        title: modalMovie.title,
        backdrop,
        runtime: modalMovie.runtime,
        release_date: modalMovie.release_date,
        overview: modalMovie.overview,
        genres,
        trailer: movieTrailerLink
      }
  
      updateModalData(modalMovieInfo);
    } catch (error) {
      console.error('Error loading movie data: ', error);
    }
  };

  const onFavorite = (event) => {
    event.stopPropagation();
    updateFavoritedMovies(id);
  };

  const onWatched = (event) => {
    event.stopPropagation();
    updateWatchedMovies(id);
  };
  
  return (
    <div className="movie-card" onClick={handleCardClick}>
      <img src={image} alt={`Poster Image of ${title}`} />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>Rating: {rating.toFixed(2)}</p>
        <div className="features">
          {/* Button Component Here (reusable) */}
          <button id="favorite" onClick={onFavorite}>Favorite {isFavorited ? '⭐' : '☆'}</button>
          <button id="watched" onClick={onWatched}>Watched {isWatched ? '✅' : '☑️'}</button>
        </div>
      </div>
    </div>
  )
};

export default MovieCard