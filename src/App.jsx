import { useState, useEffect } from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import SortMenu from './components/SortMenu'
import MovieList from './components/MovieList'
import LoadMore from './components/LoadMore'

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState([]);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const fetchData = async (query, page) => {
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

  const handlePageChange = async () => {
    setPage(page + 1);
  }

  useEffect(() => {
    const fetchMoreMovieData = async () => {
      const data = await fetchData(query, page);
      const movieInfoData = data.results;
      const allMovieData = movieData.concat(movieInfoData);
      setMovieData(allMovieData);
    };

    fetchMoreMovieData();
  }, [page]);

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
          <SearchForm onQueryChange={handleQueryChange}/>
          <SortMenu sort={handleSortOptionSelected}/>
        </div>
      </nav>
      <main>
        <MovieList movieData={movieData}/>
        <LoadMore onPageChange={handlePageChange}/>
      </main>
      <footer>2025 Flixter</footer>
    </div>
  )
}

export default App
