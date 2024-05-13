import { useState } from "react";
import "./form.css";
import { FormInput } from "./FormInput";

export function ProductForm({ onClose, initialProduct, onAction }) {
  const [updatedProduct, setUpdatedProduct] = useState({ ...initialProduct });
  const handleInputChange = (e) => {
    const newProduct = { ...updatedProduct };
    newProduct[e.target.name] = e.target.value;
    setUpdatedProduct(newProduct);
  };

  const handleButtons = (e) => {
    e.preventDefault();
    onAction(e, initialProduct, updatedProduct);
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-form">
        <button className="closeForm" onClick={onClose}>
          &times;
        </button>
        <h2>{initialProduct.id ? "Edit Product" : "Add Product"}</h2>
        <form className="productForm">
          <div className="inputs">
            <FormInput
              name="sku"
              product={initialProduct}
              onChange={handleInputChange}
              type="number"
              focus
            />
            <FormInput
              name="name"
              product={initialProduct}
              onChange={handleInputChange}
            />
            <FormInput
              name="description"
              product={initialProduct}
              onChange={handleInputChange}
            />
            <FormInput
              name="type"
              product={initialProduct}
              onChange={handleInputChange}
            />
            <FormInput
              name="manufacturer"
              product={initialProduct}
              onChange={handleInputChange}
            />
            <FormInput
              name="price"
              product={initialProduct}
              onChange={handleInputChange}
            />
          </div>
          <div className="formButtons">
            <button
              type="submit"
              className="confirmButton"
              name="confirm"
              onClick={handleButtons}
            >
              Confirm
            </button>
            {initialProduct.id && (
              <>
                <br></br>
                <button
                  className="deleteButton"
                  name="delete"
                  onClick={handleButtons}
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
