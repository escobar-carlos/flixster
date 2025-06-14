import './Sidebar.css'

function Sidebar({ setActiveView }) {

  const updateActiveView = async (event) => {
    const label = event.target.textContent.toLowerCase();
    switch (label) {
      case 'favorites':
        setActiveView('favorites');
        break;
      case 'watched':
        setActiveView('watched');
        break;
      case 'home':
        setActiveView('home')
        break;
      default:
        console.error("Invalid option was selected.")
    }
  }

  return (
    <div className="sidebar">
        <button onClick={updateActiveView}>Home</button>
        <button onClick={updateActiveView}>Favorites</button>
        <button onClick={updateActiveView}>Watched</button>
    </div>
  )
}

export default Sidebar