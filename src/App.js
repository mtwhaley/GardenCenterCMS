import { useState } from "react";
import { getAll, getById } from "./MockAPI/MockAPI";
import { ProductCard } from "./ProductCard";

export default function App() {
  return (
    <>
      <SearchBar />
      <Products />
    </>
  );
}

function Products() {
  const [products, setProducts] = useState(getAll());

  return (
    <>
      {products.map((product) => {
        return <ProductCard product={product} />;
      })}
    </>
  );
}

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchField, setSearchField] = useState("sku");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    onSearch(query, searchField);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Products..."
        value={query}
        onChange={handleInputChange}
      />
      <select value={searchField} onChange={handleSelectChange}>
        <option value="sku">SKU</option>
        <option value="name">Name</option>
        <option value="description">Description</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};
