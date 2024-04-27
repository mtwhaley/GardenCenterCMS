import { ProductCard } from "./ProductCard";

export function Products({ products, filters }) {
  return (
    <>
      {products.map((product) => {
        if (
          filters.typeFilter.toLowerCase() != "any" &&
          product.type != filters.typeFilter
        )
          return;
        if (
          filters.manufacturerFilter.toLowerCase() != "any" &&
          product.manufacturer != filters.manufacturerFilter
        )
          return;

        return <ProductCard product={product} />;
      })}
    </>
  );
}
