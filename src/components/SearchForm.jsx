function SearchForm( {onQueryChange} ) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target[0].value;
    event.target.reset();
    onQueryChange(query);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search"/>
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Clear</button>
        </div>
      </form>
    </>
  )
}

export default SearchForm