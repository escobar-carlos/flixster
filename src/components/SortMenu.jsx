function SortMenu( {sort} ) {
  const handleChange = (event) => {
    sort(event.target.value);
  }
  return (
    <select id="sort-options" onChange={handleChange}>
      <option selected disabled>Sort:</option>
      <option value="alphabetical">A - Z (alphabetic)</option>
      <option value="chronological">Release Date (most recent to oldest)</option>
      <option value="vote-average">Vote Average (descending)</option>
    </select>
  )
}

export default SortMenu