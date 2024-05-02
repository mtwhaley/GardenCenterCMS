import { ProductForm } from "./ProductForm";

export function AddForm({ onClose, initialProduct, onConfirm }) {
  const handleSubmit = (newProduct) => {
    onConfirm(initialProduct, newProduct);
    onClose();
  };
  return (
    <ProductForm
      title={"Add Product"}
      onClose={onClose}
      onSubmit={handleSubmit}
      fillProduct={initialProduct}
    />
  );
}
