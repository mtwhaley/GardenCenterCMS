import PropTypes from "prop-types";

export function Input({ type, label, name, defaultValue, onChange, focus }) {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        autoFocus={focus}
        required
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  focus: PropTypes.bool,
};
