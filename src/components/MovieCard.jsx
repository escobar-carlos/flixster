function MovieCard( {image, title, rating} ) {
  return (
    <div className="movie-card">
      <img src={image} alt={`Poster Image of ${title}`} />
      <h3>{title}</h3>
      <p>{rating}</p>
      {/* <div className="features">
        <button className="favorite-button">Favorite</button>
        <button className="watched-button">Watched</button>
      </div> */}
    </div>
  )
};

export default MovieCard