import { Products } from "./productList/Products.js";
import { ControlBar } from "./controlBar/ControlBar.js";
import { AddProduct } from "./addProduct/AddProduct.js";
import useSearch from "./customHooks/useSearch.js";
import * as utils from "./Utilities.js";

export function Workspace({ onOpenForm, allProducts }) {
  const { search, searchFunctions } = useSearch(allProducts);

  const visibleProducts = utils.filterProductsBySearch(allProducts, search);
  const uniques = utils.getUniques(visibleProducts);

  return (
    <>
      <ControlBar
        search={search}
        searchFunctions={searchFunctions}
        uniques={uniques}
      />
      <AddProduct onAddClick={onOpenForm} />
      <Products
        visibleProducts={visibleProducts}
        filters={search.filters}
        onEdit={onOpenForm}
      />
    </>
  );
}
