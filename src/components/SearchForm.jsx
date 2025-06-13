import './SearchForm.css'

function SearchForm({ onQueryChange, onClear }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target[0].value;
    event.target.reset();
    onQueryChange(query);
  }

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search"/>
        <div id="search-helper-buttons">
          <button type="submit">Submit</button>
          <button type="reset" onClick={onClear}>Clear</button>
        </div>
      </form>
    </>
  )
}

export default SearchForm