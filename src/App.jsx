import { useState, useEffect } from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import SortMenu from './components/SortMenu'
import MovieList from './components/MovieList'
import Modal from './components/Modal'
import Sidebar from './components/Sidebar'

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [favoritedMovies, setFavoritedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [activeView, setActiveView] = useState('home');
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const fetchData = async () => {
    try {
      let response = null;
      if (query) {
        const formattedQuery = query.split(' ').join('%20');
        response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${formattedQuery}&include_adult=false&language=en-US&page=${page}`);
      } else {
        response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`);
      }
      if (!response.ok) {
        throw new Error('Failed to fetch movie data.');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const data = await fetchData();
      const movieInfoData = data.results;
      if (page == 1) {
        setMovieData(movieInfoData);
      } else {
        setMovieData(prev => [...prev, ...data.results]);
      }
    };
    fetchMovieData();
  }, [page, query]);

  const handleQueryChange = (query) => {
    setQuery(query);
  };

  const handleClear = () => {
    setQuery('');
    setPage(1);
  };

  const handlePageChange = () => {
    setPage(prev => prev + 1);
  };

  const updateModalData = (modalMovieInfo) => {
    setModalData(modalMovieInfo);
    setIsOpen(true);
  };

  const updateMovies = (id, setMovies) => {
    const movie = movieData.find(m => m.id == id);
    setMovies(prev => {
      return prev.includes(movie) ? prev.filter(m => m.id != id) : [...prev, movie];
    })
  };

  const updateFavoritedMovies = (id) => {
    updateMovies(id, setFavoritedMovies);
  };

  const updateWatchedMovies = (id) => {
    updateMovies(id, setWatchedMovies);
  };

  const handleSort = (sortedMovieData) => {
    setMovieData(sortedMovieData);
  };

  const moviesToDisplay = activeView == 'favorites' ? favoritedMovies : activeView == 'watched' ? watchedMovies : movieData;

  return (
    <div className="App">
      <Sidebar setActiveView={setActiveView}/>
      <div className="content-container">
        <header>
          <h1 id="title">Flixster &#x1F3A5;</h1>
        </header>
        <nav>
          {activeView == 'home' && (
            <div id="toolbar">
              <SearchForm onQueryChange={handleQueryChange} onClear={handleClear}/>
              <SortMenu movieData={movieData} onSort={handleSort}/>
            </div>
          )}
        </nav>
        <main>
          <MovieList
            movieData={moviesToDisplay}
            favoritedMovies={favoritedMovies}
            watchedMovies={watchedMovies}
            updateModalData={updateModalData}
            onButtonClick={{updateFavoritedMovies, updateWatchedMovies}}
          />
          {activeView == 'home' && (
            <button id="load-more" onClick={handlePageChange}>Load More</button>
          )}
        </main>
        <Modal modalData={modalData} setIsOpen={setIsOpen} isOpen={isOpen}/>
        <footer>2025 Flixter</footer>
      </div>
    </div>
  )
}

export default App
