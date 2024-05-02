import { useState } from "react";
import "./form.css";
import { FormInput } from "./FormInput";

export function ProductForm({ onClose, initialProduct, onDelete, onConfirm }) {
  const [updatedProduct, setUpdatedProduct] = useState({ ...initialProduct });
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
        <h2>{initialProduct.id ? "Edit Product" : "Add Product"}</h2>
        <form
          className="productForm"
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm(initialProduct, updatedProduct);
            onClose();
          }}
        >
          <div className="inputs">
            <FormInput
              name="sku"
              product={initialProduct}
              onChange={handleInputChange}
              type="number"
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
            <button type="submit" className="confirmButton">
              Confirm
            </button>
            {initialProduct.id && (
              <>
                <br></br>
                <button
                  className="deleteButton"
                  onClick={() => {
                    onDelete(initialProduct);
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
