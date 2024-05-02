import { ProductForm } from "./ProductForm";

export const EditForm = ({ onClose, initialProduct, onUpdate, onDelete }) => {
  const handleSubmit = (newProduct) => {
    onUpdate(initialProduct, newProduct);
    onClose(); // Close the popup after submission
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
