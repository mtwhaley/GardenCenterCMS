import { useState } from "react";
import { getAll, post, deleteProduct } from "./MockAPI/MockAPI";
import { Products } from "./Products";
import { ControlBar } from "./controlBar/ControlBar";
import { EditForm } from "./forms/EditForm";
import "./main.css";
import { AddForm } from "./forms/AddForm";
import { AddProduct } from "./AddProduct";

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
  const [visibleProducts, setVisibleProducts] = useState(allProducts);

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
  const handleUpdate = (oldProduct, newProduct) => {
    oldProduct === defaultProduct
      ? setVisibleProducts([newProduct, ...visibleProducts])
      : setVisibleProducts(
          visibleProducts.map((product) =>
            product === oldProduct ? newProduct : product
          )
        );
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

  const handleAdd = (product) => {
    post(product);
    setAllProducts(getAll());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.query) {
      setAllProducts(allProducts);
      return;
    }
    const filteredProducts = allProducts.filter((product) => {
      return product[search.field]
        .toString()
        .toLowerCase()
        .includes(search.query.toLowerCase());
    });
    setAllProducts(filteredProducts);
  };

  const uniqueTypes = [];
  const uniqueManufacturers = [];
  for (const product of visibleProducts) {
    if (!uniqueTypes.includes(product.type)) uniqueTypes.push(product.type);
    if (!uniqueManufacturers.includes(product.manufacturer))
      uniqueManufacturers.push(product.manufacturer);
    uniqueTypes.sort();
    uniqueManufacturers.sort();
  }

  return (
    <>
      {formStatus &&
        (formProduct.sku === undefined ? (
          <AddForm
            onClose={() => {
              setFormStatus(false);
            }}
            onAdd={handleAdd}
            initialProduct={defaultProduct}
          />
        ) : (
          <EditForm
            onClose={() => {
              setFormStatus(false);
            }}
            initialProduct={formProduct}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}

      <ControlBar
        search={search}
        setSearch={setSearch}
        onChangeFilters={handleChangeFilters}
        types={uniqueTypes}
        manufacturers={uniqueManufacturers}
        handleSearch={handleSearch}
      />

      <AddProduct onAddClick={handleAddClick} />

      <Products
        query=""
        allProducts={allProducts}
        filters={filters}
        onEdit={handleOpenEdit}
      />
    </>
  );
}
