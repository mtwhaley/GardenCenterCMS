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
