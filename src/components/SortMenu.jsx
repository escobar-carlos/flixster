import './SortMenu.css'

function SortMenu({ movieData, onSort }) {

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
  };

  const handleSortOptionChange = (sortOption) => {
    const sortedData = sortMovieData(movieData, sortOption);
    onSort(sortedData);
  }

  return (
    <select id="sort-options" onChange={(event) => handleSortOptionChange(event.target.value)}>
      <option selected disabled>Sort:</option>
      <option value="alphabetical">A - Z (alphabetic)</option>
      <option value="chronological">Release Date (most recent to oldest)</option>
      <option value="vote-average">Vote Average (descending)</option>
    </select>
  )
}

export default SortMenu