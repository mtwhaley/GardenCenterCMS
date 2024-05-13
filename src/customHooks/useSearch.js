import { useState } from "react";
import * as utils from "../Utilities.js";

export default function useSearch(allProducts) {
  const [search, setSearch] = useState({
    query: "",
    field: "sku",
    filters: { type: "Any", manufacturer: "Any" },
  });

  const handleChangeFilters = (e) => {
    const newFilters = { ...search.filters };
    newFilters[e.target.name] = e.target.value;
    setSearch({ ...search, filters: newFilters });
  };

  const handleResetSearch = (e) => {
    e && e.preventDefault();
    const defaultFilters = { type: "Any", manufacturer: "Any" };
    setSearch({ query: "", field: search.field, filters: defaultFilters });
  };

  const handleSearch = (newSearch) => {
    const visibleProducts = utils.filterProductsBySearch(allProducts, search);
    const validFilters = utils.validFilters(visibleProducts, search.filters);
    const newFilters = { ...search.filters };
    if (!validFilters.type || !validFilters.manufacturer) {
      if (!validFilters.type) newFilters.type = "Any";
      if (!validFilters.manufacturer) newFilters.manufacturer = "Any";
    }

    setSearch({ ...newSearch, filters: newFilters });
  };

  const searchFunctions = {
    onSearch: handleSearch,
    onResetSearch: handleResetSearch,
    onChangeFilters: handleChangeFilters,
  };

  return { search, searchFunctions };
}
