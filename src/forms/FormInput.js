import { Input } from "./Input";

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
