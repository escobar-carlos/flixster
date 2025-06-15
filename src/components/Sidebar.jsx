import './Sidebar.css'

function Sidebar({ setActiveView }) {

  // Updates what should be displayed on screen based on button clicked on sidebar
  const updateActiveView = (event) => {
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
  };

  return (
    <div className="sidebar">
      <ul>
        <li><button onClick={updateActiveView}>Home</button></li>
        <li><button onClick={updateActiveView}>Favorites</button></li>
        <li><button onClick={updateActiveView}>Watched</button></li>
      </ul>
    </div>
  )
};

export default Sidebar