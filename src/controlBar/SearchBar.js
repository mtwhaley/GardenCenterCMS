import PropTypes from "prop-types";

export const SearchBar = ({ onSearch, search, onResetSearch }) => {
  const handleInputChange = (e) => {
    const newSearch = { ...search };
    newSearch[e.target.name] = e.target.value;
    onSearch(newSearch);
  };

  return (
    <form className="search-bar">
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

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  search: PropTypes.object,
  onResetSearch: PropTypes.func,
};
