import { ProductForm } from "./ProductForm";

export const EditForm = ({ onClose, editingProduct, onUpdate, onDelete }) => {
  const handleSubmit = (newProduct) => {
    onUpdate(editingProduct, newProduct);

    onClose(); // Close the popup after submission
  };

  return (
    <ProductForm
      onClose={onClose}
      onSubmit={handleSubmit}
      editingProduct={editingProduct}
      onDelete={onDelete}
    />
  );
};
