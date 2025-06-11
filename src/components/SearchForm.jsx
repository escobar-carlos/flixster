function SearchForm( {onQueryChange} ) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target[0].value;
    event.target.reset();
    onQueryChange(query);
  }

  const handleReset = (event) => {
    event.preventDefault();
    onQueryChange('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search"/>
        <div>
          <button type="submit">Submit</button>
          <button type="reset" onClick={handleReset}>Clear</button>
        </div>
      </form>
    </>
  )
}

export default SearchForm