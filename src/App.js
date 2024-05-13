import * as utils from "./Utilities.js";
import { useState } from "react";
import { ProductForm } from "./forms/ProductForm.js";
import { Error } from "./errorHandling/Error.js";
import { LoadingSpinner } from "./spinner/LoadingSpinner.js";
import { Workspace } from "./Workspace.js";
import useFetchProducts from "./customHooks/useFetchProducts.js";

export default function App() {
  const [formData, setFormData] = useState({
    product: utils.defaultProduct,
    status: false,
  });

  const { productData, setProductData, handleForm } = useFetchProducts();

  const handleOpenForm = (product) => {
    setFormData({ status: true, product: product || utils.defaultProduct });
  };

  const handleErrorClose = () => {
    const newStatus = { ...productData.status, hide: true };
    setProductData({ ...productData, status: newStatus });
  };

  return (
    <>
      {productData.isLoading ? (
        <LoadingSpinner />
      ) : !productData.status.connection ? (
        <Error status={productData.status} />
      ) : (
        <>
          {Math.floor(productData.status.statusCode / 100) !== 2 && (
            <Error status={productData.status} onClose={handleErrorClose} />
          )}
          {formData.status && (
            <ProductForm
              onClose={() => {
                setFormData({ status: false });
              }}
              initialProduct={formData.product}
              onAction={handleForm}
            />
          )}
          <Workspace
            onOpenForm={handleOpenForm}
            allProducts={productData.allProducts}
          />
        </>
      )}
    </>
  );
}
