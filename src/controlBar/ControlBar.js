import { FilterBar } from "./FilterBar";
import { SearchBar } from "./SearchBar";
import "./searchAndFilter.css";

export function ControlBar({ search, uniques, searchFunctions }) {
  return (
    <>
      <SearchBar
        search={search}
        onSearch={searchFunctions.onSearch}
        onResetSearch={searchFunctions.onResetSearch}
      />
      <FilterBar
        onChangeFilters={searchFunctions.onChangeFilters}
        types={uniques.types}
        manufacturers={uniques.manufacturers}
        search={search}
      />
    </>
  );
}
