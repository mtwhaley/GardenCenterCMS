import { Input } from "./Input";
import PropTypes from "prop-types";

export function FormInput({ name, onChange, product, type = "text", focus }) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const defaultValue = product[name];
  return (
    <Input
      type={type}
      label={label}
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
      focus={focus}
    />
  );
}

FormInput.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  product: PropTypes.object,
  type: PropTypes.text,
  focus: PropTypes.bool,
};
