import { ProductForm } from "./ProductForm";

export function AddForm({ onClose, initialProduct, onAdd }) {
  const handleSubmit = (newProduct) => {
    onAdd(newProduct);
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
