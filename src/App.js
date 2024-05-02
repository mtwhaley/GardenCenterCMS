import { useState } from "react";
import { getAll, post, put, deleteProduct } from "./MockAPI/MockAPI";
import { Products } from "./productList/Products";
import { ControlBar } from "./controlBar/ControlBar";
import "./main.css";
import { AddProduct } from "./AddProduct";
import { ProductForm } from "./forms/ProductForm";
import * as utils from "./Utilities.js";

export default function App() {
  const [allProducts, setAllProducts] = useState(getAll());
  const [search, setSearch] = useState({ query: "", field: "sku" });
  const [filters, setFilters] = useState({
    typeFilter: "Any",
    manufacturerFilter: "Any",
  });
  const [formStatus, setFormStatus] = useState(false);
  const [formProduct, setFormProduct] = useState(utils.defaultProduct);

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
    setFormProduct(utils.defaultProduct);
    setFormStatus(true);
  };

  const handleResetSearch = (e) => {
    e && e.preventDefault();

    setSearch({ ...search, query: "" });
  };

  const visibleProducts = utils.filterProductsBySearch(allProducts, search);
  const uniques = utils.getUniques(visibleProducts);

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
        types={uniques.types}
        manufacturers={uniques.manufacturers}
      />
      <AddProduct onAddClick={handleAddClick} />

      <Products
        visibleProducts={visibleProducts}
        filters={filters}
        onEdit={handleOpenEdit}
      />
    </>
  );
}
