import { useState } from "react";
import { getAll, getById } from "./MockAPI/MockAPI";
import { FilterBar } from "./FilterBar";
import { Products } from "./Products";
import { SearchBar } from "./SearchBar";

export default function App() {
  const allProducts = getAll();
  const defaultProduct = {
    sku: undefined,
    name: "",
    description: "",
    type: "",
    manufacturer: "",
    price: "",
  };
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState({ query: "", field: "sku" });
  const [filters, setFilters] = useState({
    typeFilter: "Any",
    manufacturerFilter: "Any",
  });
  const [formStatus, setFormStatus] = useState(false);
  const [formProduct, setFormProduct] = useState(defaultProduct);

  const handleEdit = (product) => {
    setFormProduct(product);
    setFormStatus(true);
  };

  const handleUpdate = (oldProduct, newProduct) => {
    console.log(newProduct);
    const newProducts = products.map((product) => {
      return product === oldProduct ? newProduct : product;
    });
    setProducts(newProducts);
  };

  const handleResetSearch = (e) => {
    //<------not firing
    alert();
    e.preventDefault();
    alert();
    setSearch("");
    setProducts(allProducts);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    if (!search.query) {
      setProducts(allProducts);
      return;
    }

    const lowercasedQuery = search.query.toLowerCase(); // Case-insensitive search

    const filteredProducts = allProducts.filter((product) => {
      return product[search.field]
        .toString()
        .toLowerCase()
        .includes(lowercasedQuery);
    });

    setProducts(filteredProducts);
  };

  const handleChangeFilters = (e) => {
    const newFilters = { ...filters };
    newFilters[e.target.name] = e.target.value;
    setFilters(newFilters);
  };

  const uniqueTypes = [];
  const uniqueManufacturers = [];
  for (const product of products) {
    if (!uniqueTypes.includes(product.type)) uniqueTypes.push(product.type);
    if (!uniqueManufacturers.includes(product.manufacturer))
      uniqueManufacturers.push(product.manufacturer);
  }

  return (
    <>
      {formStatus && (
        <EditForm
          onClose={() => {
            setFormStatus(false);
          }}
          editingProduct={formProduct}
          onUpdate={handleUpdate}
        />
      )}
      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        onResetSearch={handleResetSearch}
      />
      <FilterBar
        types={uniqueTypes}
        manufacturers={uniqueManufacturers}
        onChangeFilters={handleChangeFilters}
      />
      <Products products={products} filters={filters} onEdit={handleEdit} />
    </>
  );
}

const EditForm = ({ onClose, editingProduct, onUpdate }) => {
  const handleSubmit = (newProduct) => {
    onUpdate(editingProduct, newProduct);

    onClose(); // Close the popup after submission
  };

  return (
    <ProductForm
      onClose={onClose}
      onSubmit={handleSubmit}
      editingProduct={editingProduct}
    />
  );
};

function ProductForm({ onClose, onSubmit, editingProduct }) {
  const [updatedProduct, setUpdatedProduct] = useState({ ...editingProduct });
  const handleInputChange = (e) => {
    const newProduct = { ...updatedProduct };
    newProduct[e.target.name] = e.target.value;
    setUpdatedProduct(newProduct);
  };
  return (
    <>
      {editingProduct && (
        <div className="popup-container">
          <div className="popup-form">
            <h2>Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(updatedProduct);
              }}
            >
              <div className="form-group">
                <label htmlFor="sku">SKU:</label>
                <input
                  type="number"
                  id="sku"
                  name="sku"
                  defaultValue={editingProduct.sku}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={editingProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={editingProduct.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  defaultValue={editingProduct.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="manufacturer">Manufacturer:</label>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  defaultValue={editingProduct.manufacturer}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  defaultValue={editingProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Submit</button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
