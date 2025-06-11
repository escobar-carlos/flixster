import { useState, useEffect } from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import SortMenu from './components/SortMenu'
import MovieList from './components/MovieList'
import LoadMore from './components/LoadMore'

const App = () => {
  const [query, setQuery] = useState('');
  // const [isSearch, setIsSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState([]);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const fetchData = async (query) => {
    try {
      let response = null;
      if (query) {
        const keywords = query.split(' ').join('%20');
        response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`);
      } else {
        response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
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
    const fetchMovieData = async (query) => {
      setPage(1);
      const data = await fetchData(query, page);
      const movieInfoData = data.results;
      setMovieData(movieInfoData);
    };
    fetchMovieData(query);
  }, [query]);

  const handleQueryChange = async (query) => {
    setQuery(query);
  }

  // const handlePageChange = async (page) => {
  //   setPage(page + 1);
  // }

  // useEffect(() => {
  //   const fetchMoreMovieData = async () => {
  //     const data = await fetchData(query, page);
  //     const movieInfoData = data.results;
  //     setMovieData((movieData.push(movieInfoData)));
  //   };
  //   fetchMoreMovieData();
  // }, [page])

  return (
    <div className="App">
      <header>
        <h1 id="title">Flixster</h1>
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
