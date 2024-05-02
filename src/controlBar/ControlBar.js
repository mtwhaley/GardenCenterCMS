import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { SearchBar } from "./SearchBar";
import "./searchAndFilter.css";

export function ControlBar({
  search,
  onSearch,
  onChangeFilters,
  types,
  manufacturers,
  onResetSearch,
}) {
  return (
    <>
      <SearchBar
        search={search}
        onSearch={onSearch}
        onResetSearch={onResetSearch}
      />
      <FilterBar
        onChangeFilters={onChangeFilters}
        types={types}
        manufacturers={manufacturers}
      />
    </>
  );
}
