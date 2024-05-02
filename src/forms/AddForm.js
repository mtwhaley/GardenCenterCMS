import { ProductForm } from "./ProductForm";

export function AddForm({ onClose, initialProduct, onConfirm }) {
  return (
    <ProductForm
      onClose={onClose}
      onConfirm={onConfirm}
      initialProduct={initialProduct}
    />
  );
}
