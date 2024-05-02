export const SearchBar = ({ onSearch, search, setSearch, onResetSearch }) => {
  const handleInputChange = (e) => {
    const newSearch = { ...search };
    newSearch[e.target.name] = e.target.value;
    setSearch(newSearch);
  };

  return (
    <form className="search-bar" onSubmit={onSearch}>
      <select value={search.field} name="field" onChange={handleInputChange}>
        <option value="sku">SKU</option>
        <option value="name">Name</option>
        <option value="description">Description</option>
      </select>
      <input
        name="query"
        type="text"
        placeholder="Search Products..."
        value={search.query}
        onChange={handleInputChange}
      />
      <button className="cancelSearch" onClick={onResetSearch}>
        &times;
      </button>
    </form>
  );
};
