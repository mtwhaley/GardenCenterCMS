import { useState } from "react";
import { getAll, post, put, deleteProduct } from "./MockAPI/MockAPI";
import { Products } from "./Products";
import { ControlBar } from "./controlBar/ControlBar";
import "./main.css";
import { AddProduct } from "./AddProduct";
import { ProductForm } from "./forms/ProductForm";

export default function App() {
  const [allProducts, setAllProducts] = useState(getAll());
  const defaultProduct = {
    sku: undefined,
    name: "",
    description: "",
    type: "",
    manufacturer: "",
    price: "",
  };

  const [search, setSearch] = useState({ query: "", field: "sku" });
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
  const handleForm = (oldProduct, newProduct) => {
    oldProduct.id === undefined
      ? post(newProduct)
      : put(newProduct, oldProduct.id);
    setAllProducts(getAll());
  };
  const handleDelete = (product) => {
    deleteProduct(product.id);
    setAllProducts(getAll());
  };

  const handleChangeFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    setFormProduct(defaultProduct);
    setFormStatus(true);
  };

  const handleResetSearch = (e) => {
    e && e.preventDefault();

    setSearch({ ...search, query: "" });
  };
  const visibleProducts2 = allProducts.filter((product) => {
    return product[search.field]
      .toString()
      .toLowerCase()
      .includes(search.query.toLowerCase());
  });

  const uniqueTypes = [];
  const uniqueManufacturers = [];
  for (const product of visibleProducts2) {
    if (!uniqueTypes.includes(product.type)) uniqueTypes.push(product.type);
    if (!uniqueManufacturers.includes(product.manufacturer))
      uniqueManufacturers.push(product.manufacturer);
    uniqueTypes.sort();
    uniqueManufacturers.sort();
  }

  return (
    <>
      {formStatus && (
        <ProductForm
          onClose={() => {
            setFormStatus(false);
          }}
          initialProduct={formProduct}
          onConfirm={handleForm}
          onDelete={handleDelete}
        />
      )}

      <ControlBar
        search={search}
        setSearch={setSearch}
        onResetSearch={handleResetSearch}
        onChangeFilters={handleChangeFilters}
        types={uniqueTypes}
        manufacturers={uniqueManufacturers}
      />
      <AddProduct onAddClick={handleAddClick} />

      <Products
        visibleProducts={visibleProducts2}
        filters={filters}
        onEdit={handleOpenEdit}
      />
    </>
  );
}
