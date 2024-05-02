import { ProductForm } from "./ProductForm";

export const EditForm = ({ onClose, initialProduct, onConfirm, onDelete }) => {
  const handleSubmit = (newProduct) => {
    onConfirm(initialProduct, newProduct);
    onClose();
  };

  return (
    <ProductForm
      title={"Edit Product"}
      onClose={onClose}
      onSubmit={handleSubmit}
      fillProduct={initialProduct}
      onDelete={onDelete}
    />
  );
};
