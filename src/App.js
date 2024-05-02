import { useState } from "react";
import { GET, POST, PUT, DELETE } from "./APICalls";
import { Products } from "./productList/Products";
import { ControlBar } from "./controlBar/ControlBar";
import "./main.css";
import { AddProduct } from "./AddProduct";
import { ProductForm } from "./forms/ProductForm";
import * as utils from "./Utilities.js";

export default function App() {
  const [allProducts, setAllProducts] = useState(GET());
  const [search, setSearch] = useState({ query: "", field: "sku" });
  const [filters, setFilters] = useState({
    typeFilter: "Any",
    manufacturerFilter: "Any",
  });
  const [formStatus, setFormStatus] = useState(false);
  const [formProduct, setFormProduct] = useState(utils.defaultProduct);

  //functions with API interaction
  const handleForm = (oldProduct, newProduct) => {
    oldProduct.id === undefined
      ? POST(newProduct)
      : PUT(newProduct, oldProduct.id);
    setAllProducts(GET());
  };
  const handleDelete = (product) => {
    DELETE(product.id);
    setAllProducts(GET());
  };

  //forms
  const handleOpenForm = (product) => {
    product ? setFormProduct(product) : setFormProduct(utils.defaultProduct);
    setFormStatus(true);
  };

  //filters
  const handleChangeFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleResetSearch = (e) => {
    e && e.preventDefault();

    setSearch({ ...search, query: "" });
  };
  const handleSearch = (newSearch) => {
    const validFilters = utils.validFilters(visibleProducts, filters);
    if (!validFilters.type || !validFilters.manufacturer) {
      const newFilters = { ...filters };
      if (!validFilters.type) newFilters.typeFilter = "Any";
      if (!validFilters.manufacturer) newFilters.manufacturerFilter = "Any";
      setFilters(newFilters);
    }

    setSearch(newSearch);
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
        onSearch={handleSearch}
        onResetSearch={handleResetSearch}
        onChangeFilters={handleChangeFilters}
        types={uniques.types}
        manufacturers={uniques.manufacturers}
      />
      <AddProduct onAddClick={handleOpenForm} />

      <Products
        visibleProducts={visibleProducts}
        filters={filters}
        onEdit={handleOpenForm}
      />
    </>
  );
}
