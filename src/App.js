import { useState } from "react";
import { getAll, getById } from "./MockAPI/MockAPI";
import { FilterBar } from "./FilterBar";
import { Products } from "./Products";
import { SearchBar } from "./SearchBar";
import "./searchAndFilter.css";
import "./form.css";

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
  const [filters, setFilters] = useState({
    typeFilter: "Any",
    manufacturerFilter: "Any",
  });
  const [formStatus, setFormStatus] = useState(false);
  const [formProduct, setFormProduct] = useState(defaultProduct);

  const handleOpenEdit = (product) => {
    setFormProduct(product);
    setFormStatus(true);
  };

  const handleUpdate = (oldProduct, newProduct) => {
    oldProduct === defaultProduct
      ? setProducts([newProduct, ...products])
      : setProducts(
          products.map((product) =>
            product === oldProduct ? newProduct : product
          )
        );
  };
  const handleDelete = (product) => {
    setProducts(products.filter((p) => p !== product));
  };

  const handleChangeFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const uniqueTypes = [];
  const uniqueManufacturers = [];
  for (const product of products) {
    if (!uniqueTypes.includes(product.type)) uniqueTypes.push(product.type);
    if (!uniqueManufacturers.includes(product.manufacturer))
      uniqueManufacturers.push(product.manufacturer);
    uniqueTypes.sort();
    uniqueManufacturers.sort();
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
          onDelete={handleDelete}
        />
      )}
      <ControlBar
        setProducts={setProducts}
        allProducts={allProducts}
        onChangeFilters={handleChangeFilters}
        types={uniqueTypes}
        manufacturers={uniqueManufacturers}
      />
      <Products products={products} filters={filters} onEdit={handleOpenEdit} />
    </>
  );
}

function ControlBar({
  setProducts,
  allProducts,
  onChangeFilters,
  types,
  manufacturers,
}) {
  const [search, setSearch] = useState({ query: "", field: "sku" });
  const handleResetSearch = (e) => {
    e.preventDefault();
    setSearch({ ...search, query: "" });
    setProducts(allProducts);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.query) {
      setProducts(allProducts);
      return;
    }
    const filteredProducts = allProducts.filter((product) => {
      return product[search.field]
        .toString()
        .toLowerCase()
        .includes(search.query.toLowerCase());
    });
    setProducts(filteredProducts);
  };

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        onResetSearch={handleResetSearch}
      />
      <FilterBar
        onChangeFilters={onChangeFilters}
        types={types}
        manufacturers={manufacturers}
      />
    </>
  );
}

const EditForm = ({ onClose, editingProduct, onUpdate, onDelete }) => {
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

function ProductForm({ onClose, onSubmit, editingProduct, onDelete }) {
  const [updatedProduct, setUpdatedProduct] = useState({ ...editingProduct });
  const handleInputChange = (e) => {
    const newProduct = { ...updatedProduct };
    newProduct[e.target.name] = e.target.value;
    setUpdatedProduct(newProduct);
  };
  return (
    <div className="popup-container">
      <div className="popup-form">
        <button className="closeForm" onClick={onClose}>
          &times;
        </button>
        <h2>Edit Product</h2>
        <form
          className="productForm"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(updatedProduct);
          }}
        >
          <div className="inputs">
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
          </div>
          <div className="formButtons">
            <button type="submit" className="confirmButton">
              Confirm
            </button>
            <br></br>
            <button
              className="deleteButton"
              onClick={() => {
                onDelete(editingProduct);
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
