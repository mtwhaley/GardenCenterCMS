import { useState } from "react";
import { getAll, getById } from "./MockAPI/MockAPI";
import { ProductCard } from "./ProductCard";
import { FilterBar } from "./FilterBar";

export default function App() {
  const allProducts = getAll();
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState({ query: "", field: "sku" });
  const [filters, setFilters] = useState({
    typeFilter: "Any",
    manufacturerFilter: "Any",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    if (!search.query) {
      setProducts(allProducts);
      return;
    }

    const lowercasedQuery = search.query.toLowerCase(); // Case-insensitive search

    const filteredProducts = allProducts.filter((product) => {
      return product[search.field]
        .toString()
        .toLowerCase()
        .includes(lowercasedQuery);
    });

    setProducts(filteredProducts);
  };

  const handleChangeFilters = (e) => {
    const newFilters = { ...filters };
    newFilters[e.target.name] = e.target.value;
    setFilters(newFilters);
  };

  const uniqueTypes = [];
  const uniqueManufacturers = [];
  for (const product of products) {
    if (!uniqueTypes.includes(product.type)) uniqueTypes.push(product.type);
    if (!uniqueManufacturers.includes(product.manufacturer))
      uniqueManufacturers.push(product.manufacturer);
  }

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />
      <FilterBar
        types={uniqueTypes}
        manufacturers={uniqueManufacturers}
        onChangeFilters={handleChangeFilters}
      />
      <Products products={products} filters={filters} />
    </>
  );
}

function Products({ products, filters }) {
  return (
    <>
      {products.map((product) => {
        if (
          filters.typeFilter.toLowerCase() != "any" &&
          product.type != filters.typeFilter
        )
          return;
        if (
          filters.manufacturerFilter.toLowerCase() != "any" &&
          product.manufacturer != filters.manufacturerFilter
        )
          return;

        return <ProductCard product={product} />;
      })}
    </>
  );
}

const SearchBar = ({ onSearch, search, setSearch }) => {
  const handleInputChange = (e) => {
    const newSearch = { ...search };
    newSearch[e.target.name] = e.target.value;
    setSearch(newSearch);
  };

  return (
    <form className="search-bar">
      <input
        name="query"
        type="text"
        placeholder="Search Products..."
        value={search.query}
        onChange={handleInputChange}
      />
      <select value={search.field} name="field" onChange={handleInputChange}>
        <option value="sku">SKU</option>
        <option value="name">Name</option>
        <option value="description">Description</option>
      </select>
      <button type="submit" onClick={onSearch}>
        Search
      </button>
    </form>
  );
};
