import { useState, useEffect } from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import SortMenu from './components/SortMenu'
import MovieList from './components/MovieList'
import LoadMore from './components/LoadMore'

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [movieData, setMovieData] = useState([]);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie data.');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchMovieData = async () => {
      const data = await fetchData(query);
      const movieInfoData = data.results;
      setMovieData(movieInfoData);
    };
    fetchMovieData();
  }, [query]);

  const handleQueryChange = async (query) => {
    setQuery(query);
  }

  return (
    <div className="App">
      <header>
        <h1>Flixster</h1>
        <div id="toolbar">
          <SearchForm onQueryChange={handleQueryChange}/>
          <SortMenu />
        </div>
      </header>
      <main>
        <MovieList movieData={movieData}/>
        <LoadMore />
      </main>
      <footer>2025 Flixter</footer>
    </div>
  )
}

export default App
