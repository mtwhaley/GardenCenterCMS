import PropTypes from "prop-types";

export function FilterBar({ onChangeFilters, types, manufacturers, search }) {
  types = ["Any", ...types];
  manufacturers = ["Any", ...manufacturers];
  return (
    <form className="filter-bar">
      <span> </span>
      <span> </span>
      <span> </span>
      <span className="selectLabel">Product Type:</span>
      <select onChange={onChangeFilters} name="type">
        {types.map((type) => {
          return (
            <option
              value={type}
              key={type}
              selected={type === search.filters.type}
            >
              {type}
            </option>
          );
        })}
      </select>
      <span className="selectLabel">Manufacturer:</span>
      <select onChange={onChangeFilters} name="manufacturer">
        {manufacturers.map((manufacturer) => {
          return (
            <option
              value={manufacturer}
              key={manufacturer}
              selected={manufacturer === search.filters.manufacturer}
            >
              {manufacturer}
            </option>
          );
        })}
      </select>
    </form>
  );
}

FilterBar.propTypes = {
  onChangeFilters: PropTypes.func,
  types: PropTypes.array,
  manufacturers: PropTypes.array,
  search: PropTypes.object,
};
