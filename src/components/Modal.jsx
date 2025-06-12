function Modal({ selectedMovieData, setIsOpen, isOpen }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{selectedMovieData.title}</h2>
        <img src={selectedMovieData.image} alt={`Poster Image of ${selectedMovieData.title}`} />
        <h3>Release Date: {selectedMovieData.release_date}</h3>
        <h3>Overview: {selectedMovieData.description}</h3>
        <h3>Genres: N/A</h3>
        <span class="close" onClick={() => {setIsOpen(false)}}>&times;</span>
      </div>
    </div>
  )
};

export default Modal