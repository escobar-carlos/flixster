import { useState, useEffect } from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import SortMenu from './components/SortMenu'
import MovieList from './components/MovieList'
import Modal from './components/Modal'

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState([]);
  const [selectedMovieData, setSelectedMovieData] = useState({});
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
  }

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

  useEffect(() => {
    const fetchMoreMovieData = async () => {
      if (page == 1) return;
      const data = await fetchData();
      const movieInfoData = data.results;
      const allMovieData = movieData.concat(movieInfoData);
      setMovieData(allMovieData);
    };

    fetchMoreMovieData();
  }, [page]);

  const updateSelectedMovieData = async (id) => {
    const selectedMovie = movieData.filter(movie => movie.id == id)[0];
    let image = `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`;
    // TODO: fetch genres here
    const selectedMovieDataObj = {
      title: selectedMovie.title,
      image,
      release_date: selectedMovie.release_date,
      overview: selectedMovie.overview,
    }
    setSelectedMovieData(selectedMovieDataObj)
  }

  const handleSortOptionSelected = async (sortOption) => {
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
    setMovieData(sortedMovieData);
  }

  return (
    <div className="App">
      <header>
        <h1 id="title">Flixster &#x1F3A5;</h1>
      </header>
      <nav>
        <div id="toolbar">
          <SearchForm onQueryChange={handleQueryChange} onClear={handleClear}/>
          <SortMenu sort={handleSortOptionSelected}/>
        </div>
      </nav>
      <main>
        <MovieList movieData={movieData} onMovieClick={{updateSelectedMovieData, setIsOpen}}/>
        <button id="load-more" onClick={handlePageChange}>Load More</button>
      </main>
      <Modal selectedMovieData={selectedMovieData} setIsOpen={setIsOpen} isOpen={isOpen}/>
      <footer>2025 Flixter</footer>
    </div>
  )
}

export default App
