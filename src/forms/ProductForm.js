import { useState } from "react";
import "./form.css";

export function ProductForm({
  title,
  onClose,
  onSubmit,
  fillProduct,
  onDelete,
}) {
  const [updatedProduct, setUpdatedProduct] = useState({ ...fillProduct });
  const handleInputChange = (e) => {
    const newProduct = { ...updatedProduct };
    newProduct[e.target.name] = e.target.value;
    setUpdatedProduct(newProduct);
  };
  return (
    <div className="popup-container">
      <div className="popup-form">
        <button className="closeForm" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <form
          className="productForm"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(updatedProduct);
          }}
        >
          <div className="inputs">
            <FormInput
              name="sku"
              product={fillProduct}
              onChange={handleInputChange}
              type="number"
            />
            <FormInput
              name="name"
              product={fillProduct}
              onChange={handleInputChange}
            />
            <FormInput
              name="description"
              product={fillProduct}
              onChange={handleInputChange}
            />
            <FormInput
              name="type"
              product={fillProduct}
              onChange={handleInputChange}
            />
            <FormInput
              name="manufacturer"
              product={fillProduct}
              onChange={handleInputChange}
            />
            <FormInput
              name="price"
              product={fillProduct}
              onChange={handleInputChange}
            />
          </div>
          <div className="formButtons">
            <button type="submit" className="confirmButton">
              Confirm
            </button>
            {onDelete && (
              <>
                <br></br>
                <button
                  className="deleteButton"
                  onClick={() => {
                    onDelete(fillProduct);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({ name, onChange, product, type = "text" }) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const defaultValue = product[name];
  return (
    <Input
      type={type}
      label={label}
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
}
function Input({ type, label, name, defaultValue, onChange }) {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        required
      />
    </div>
  );
}
