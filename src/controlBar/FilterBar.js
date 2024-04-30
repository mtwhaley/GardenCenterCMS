export function FilterBar({ onChangeFilters, types, manufacturers }) {
  types = ["Any", ...types];
  manufacturers = ["Any", ...manufacturers];
  return (
    <form className="filter-bar">
      <span>Filter Results:</span>
      <span className="selectLabel">Product Type:</span>
      <select onChange={onChangeFilters} name="typeFilter">
        {types.map((type) => {
          return <option value={type}>{type}</option>;
        })}
      </select>
      <span className="selectLabel">Manufacturer:</span>
      <select onChange={onChangeFilters} name="manufacturerFilter">
        {manufacturers.map((manufacturer) => {
          return <option value={manufacturer}>{manufacturer}</option>;
        })}
      </select>
    </form>
  );
}
