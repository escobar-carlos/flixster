import './Modal.css'

function Modal({ modalData, setIsOpen, isOpen }) {
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
        <h2>{modalData.title}</h2>
        <img src={modalData.backdrop} alt={`Poster Image of ${modalData.title}`} />
        <p><strong>Runtime: </strong>{modalData.runtime} minutes</p>
        <p><strong>Release Date: </strong>{modalData.release_date}</p>
        <p><strong>Overview: </strong>{modalData.overview}</p>
        <p><strong>Genres: </strong>{modalData.genres}</p>
        {modalData.trailer && <iframe src={modalData.trailer} frameBorder="0" allowFullScreen={true}></iframe>}
      </div>
    </div>
  )
};

export default Modal