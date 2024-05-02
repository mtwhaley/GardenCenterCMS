import "./products.css";

export const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="product-card">
      <h3>
        {product.name} ({product.sku})
      </h3>
      <p>{product.description}</p>
      <p>
        <strong>Type:</strong> {product.type}
        <br></br>
        <strong>Manufacturer:</strong> {product.manufacturer}
        <br></br>
        <strong>Price:</strong> ${product.price}
        <button
          className="edit-button"
          onClick={() => {
            onEdit(product);
          }}
        >
          edit
        </button>
      </p>
    </div>
  );
};
