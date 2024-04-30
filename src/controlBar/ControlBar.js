import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { SearchBar } from "./SearchBar";
import "./searchAndFilter.css";

export function ControlBar({
  setProducts,
  allProducts,
  onChangeFilters,
  types,
  manufacturers,
}) {
  const [search, setSearch] = useState({ query: "", field: "sku" });
  const handleResetSearch = (e) => {
    e.preventDefault();
    setSearch({ ...search, query: "" });
    setProducts(allProducts);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.query) {
      setProducts(allProducts);
      return;
    }
    const filteredProducts = allProducts.filter((product) => {
      return product[search.field]
        .toString()
        .toLowerCase()
        .includes(search.query.toLowerCase());
    });
    setProducts(filteredProducts);
  };

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        onResetSearch={handleResetSearch}
      />
      <FilterBar
        onChangeFilters={onChangeFilters}
        types={types}
        manufacturers={manufacturers}
      />
    </>
  );
}
