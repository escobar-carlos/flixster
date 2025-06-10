function MovieCard( {image, title, rating} ) {
  return (
    <div className="movie-card">
      <img src={image} alt={`Poster Image of ${title}`} />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>Rating: {rating}</p>
        <div className="features">
          <button className="favorite-button">Favorite &#x1F31F;</button>
          <button className="watched-button">Watched &#x1F441;</button>
        </div>
      </div>
    </div>
  )
};

export default MovieCard