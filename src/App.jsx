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
  const [selectedMovieData, setSelectedMovieData] = useState({});
  const [sortOption, setSortOption] = useState('');
  const [genreMap, setGenreMap] = useState({});
  const [favoritedMovies, setFavoritedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [activeView, setActiveView] = useState('home');
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const fetchData = async () => {
    try {
      fetchGenreData();
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
  }

  const fetchGenreData = async () => {
    let response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`);
    let genreData = await response.json();
    const map = {};
    genreData.genres.forEach(info => {
      map[info.id] = info.name;
    });
    setGenreMap(map);
  }

  useEffect(() => {
    fetchGenreData();
  }, []);

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
        if (sortOption != '') {
          setMovieData(prev => {
            let combinedData = [...prev, ...data.results];
            return sortMovieData(combinedData, sortOption);
          })
        } else {
          setMovieData(prev => [...prev, ...data.results]);
        }
      }
    };
    fetchMovieData();
  }, [page, query]);

  const handleQueryChange = async (query) => {
    setQuery(query);
  }

  const handleClear = async () => {
    setQuery('');
    setPage(1);
  }

  const handlePageChange = async () => {
    setPage(prev => prev + 1);
  }

  const updateSelectedMovieData = async (id) => {
    const selectedMovie = movieData.find(movie => movie.id == id);
    let image = `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`;
    let genres = selectedMovie.genre_ids.map(id => genreMap[id]).join(', ');
    const selectedMovieDataObj = {
      title: selectedMovie.title,
      image,
      release_date: selectedMovie.release_date,
      overview: selectedMovie.overview,
      genres
    }
    setSelectedMovieData(selectedMovieDataObj);
  }

  const updateFavoritedMovies = async (id) => {
    const favoritedMovie = movieData.find(movie => movie.id == id);
    if (favoritedMovies.includes(favoritedMovie)) {
      setFavoritedMovies(prev => prev.filter(movie => movie != favoritedMovie));
    } else {
      setFavoritedMovies(prev => [...prev, favoritedMovie]);
    }
  };

  const updateWatchedMovies = async (id) => {
    const watchedMovie = movieData.find(movie => movie.id == id);
    if (watchedMovies.includes(watchedMovie)) {
      setWatchedMovies(prev => prev.filter(movie => movie != watchedMovie));
    } else {
      setWatchedMovies(prev => [...prev, watchedMovie]);
    }
  };

  const sortMovieData = (movieData, sortOption) => {
    let sortedMovieData = [...movieData];
    switch (sortOption) {
      case 'alphabetical':
        sortedMovieData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'chronological':
        sortedMovieData.sort((a, b) => b.release_date.localeCompare(a.release_date));
        break;
      case 'vote-average':
        sortedMovieData.sort((a, b) => b.vote_average - a.vote_average);
        break;
      default:
        console.error("Invalid sort option selected.")
    }
    return sortedMovieData;
  }

  const handleSortOptionSelected = async (sortOption) => {
    setSortOption(sortOption);
    let sortedMovieData = sortMovieData(movieData, sortOption);
    setMovieData(sortedMovieData)
  }

  const onSidebarClick = async (label) => {
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

  const moviesToDisplay = activeView == 'favorites' ? favoritedMovies : activeView == 'watched' ? watchedMovies : movieData;

  return (
    <div className="App">
      <Sidebar onClick={onSidebarClick}/>
      <div className="content-container">
        <header>
          <h1 id="title">Flixster &#x1F3A5;</h1>
        </header>
        <nav>
          {activeView == 'home' && (
            <div id="toolbar">
              <SearchForm onQueryChange={handleQueryChange} onClear={handleClear}/>
              <SortMenu sort={handleSortOptionSelected}/>
            </div>
          )}
        </nav>
        <main>
          <MovieList
            movieData={moviesToDisplay}
            favoritedMovies={favoritedMovies}
            watchedMovies={watchedMovies}

            onMovieClick={{updateSelectedMovieData, setIsOpen}}
            onButtonClick={{updateFavoritedMovies, updateWatchedMovies}}
          />
          {activeView == 'home' && (
            <button id="load-more" onClick={handlePageChange}>Load More</button>
          )}
        </main>
        <Modal selectedMovieData={selectedMovieData} setIsOpen={setIsOpen} isOpen={isOpen}/>
        <footer>2025 Flixter</footer>
      </div>
    </div>
  )
}

export default App
