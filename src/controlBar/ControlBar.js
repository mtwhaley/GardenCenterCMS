import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { SearchBar } from "./SearchBar";
import "./searchAndFilter.css";

export function ControlBar({
  search,
  setSearch,
  onChangeFilters,
  types,
  manufacturers,
  handleSearch,
}) {
  const handleResetSearch = (e) => {
    e.preventDefault();
    setSearch({ ...search, query: "" });
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
