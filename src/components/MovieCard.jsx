function MovieCard({ image, title, rating, id, updateSelectedMovieData, setIsOpen, updateFavoritedMovies, updateWatchedMovies }) {

  const handleModalClick = () => {
    updateSelectedMovieData(id);
    setIsOpen(true);
  }

  const onFavorite = (event) => {
    event.stopPropagation();
    updateFavoritedMovies(id);
  }

  const onWatched = (event) => {
    event.stopPropagation();
    updateWatchedMovies(id);
  }
  
  return (
    <div className="movie-card" onClick={handleModalClick}>
      <img src={image} alt={`Poster Image of ${title}`} />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>Rating: {rating.toFixed(2)}</p>
        <div className="features">
          {/* Button Component Here (reusable) */}
          <button id="favorite" onClick={onFavorite}>Favorite &#x1F31F;</button>
          <button id="watched" onClick={onWatched}>Watched &#x1F441;</button>
        </div>
      </div>
    </div>
  )
};

export default MovieCard