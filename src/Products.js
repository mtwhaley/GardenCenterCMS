import { ProductCard } from "./ProductCard";

export function Products({ allProducts, filters, onEdit }) {
  return (
    <>
      {allProducts.map((product) => {
        if (
          filters.typeFilter.toLowerCase() !== "any" &&
          product.type !== filters.typeFilter
        )
          return <></>;
        if (
          filters.manufacturerFilter.toLowerCase() !== "any" &&
          product.manufacturer !== filters.manufacturerFilter
        )
          return <></>;

        return <ProductCard product={product} onEdit={onEdit} />;
      })}
    </>
  );
}
