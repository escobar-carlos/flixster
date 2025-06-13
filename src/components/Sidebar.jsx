function Sidebar({ onClick }) {

  const handleClick = (event) => {
    onClick(event.target.textContent.toLowerCase());
  }

  return (
    <div className="sidebar">
        <button onClick={handleClick}>Home</button>
        <button onClick={handleClick}>Favorites</button>
        <button onClick={handleClick}>Watched</button>
    </div>
  )
}

export default Sidebar