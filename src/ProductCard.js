import "./products.css";

export const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="product-card">
      <h3>
        {product.name} ({product.sku})
      </h3>
      <p>{product.description}</p>
      <div>
        <strong>Type:</strong> {product.type}
      </div>
      <div>
        <strong>Manufacturer:</strong> {product.manufacturer}
      </div>
      <div>
        <strong>Price:</strong> ${product.price}
      </div>
      <button
        className="edit-button"
        onClick={() => {
          onEdit(product);
        }}
      >
        edit
      </button>
    </div>
  );
};
