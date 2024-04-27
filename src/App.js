import { useState } from "react";
import { getAll, getById } from "./MockAPI/MockAPI";
import { FilterBar } from "./FilterBar";
import { Products } from "./Products";
import { SearchBar } from "./SearchBar";

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
