import { ProductForm } from "./ProductForm";

export const EditForm = ({ onClose, initialProduct, onConfirm, onDelete }) => {
  return (
    <ProductForm
      onClose={onClose}
      onConfirm={onConfirm}
      initialProduct={initialProduct}
      onDelete={onDelete}
    />
  );
};
