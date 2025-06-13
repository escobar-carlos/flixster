import './Modal.css'

function Modal({ selectedMovieData, setIsOpen, isOpen }) {
  if (!isOpen) return null;
  const handleClickOutside = (event) => {
    if (event.target.id === 'modal-overlay') {
      setIsOpen(false);
    }
  };
  const handleClickClose = (event) => {
    event.stopPropagation();
    setIsOpen(false);
  }
  return (
    <div id="modal-overlay" onClick={handleClickOutside}>
      <div id="modal-content">
        <span id="close" onClick={handleClickClose}>&times;</span>
        <h2>{selectedMovieData.title}</h2>
        <img src={selectedMovieData.image} alt={`Poster Image of ${selectedMovieData.title}`} />
        <p><strong>Runtime: </strong>{selectedMovieData.runtime} minutes</p>
        <p><strong>Release Date: </strong>{selectedMovieData.release_date}</p>
        <p><strong>Overview: </strong>{selectedMovieData.overview}</p>
        <p><strong>Genres: </strong>{selectedMovieData.genres}</p>
        {
        selectedMovieData.trailer && <iframe src={selectedMovieData.trailer} frameborder="0" allowFullScreen="true"></iframe>
        }
      </div>
    </div>
  )
};

export default Modal