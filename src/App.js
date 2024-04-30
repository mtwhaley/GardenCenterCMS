import { useState } from "react";
import { getAll, getById } from "./MockAPI/MockAPI";
import { Products } from "./Products";
import { ControlBar } from "./controlBar/ControlBar";
import { EditForm } from "./forms/EditForm";
import "./main.css";

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
      <AddProduct />
      <Products products={products} filters={filters} onEdit={handleOpenEdit} />
    </>
  );
}

function AddProduct() {
  return (
    <div className="add">
      <button>+</button>
    </div>
  );
}
