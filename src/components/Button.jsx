import './Button.css'

function Button({ id, updateData, isActive, text, icons }) {

  const handleClick = (event) => {
    event.stopPropagation();
    updateData(id);
  };

  return (
    <button className="feature-button" onClick={handleClick}> 
      {`${text} `} {isActive ? icons[0] : icons[1] }
    </button>
  )
};

export default Button