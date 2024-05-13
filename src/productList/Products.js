import { ProductCard } from "./ProductCard";

export function Products({ visibleProducts, filters, onEdit }) {
  return (
    <>
      {visibleProducts.map((product) => {
        if (
          filters.type.toLowerCase() !== "any" &&
          product.type !== filters.type
        )
          return <></>;
        if (
          filters.manufacturer.toLowerCase() !== "any" &&
          product.manufacturer !== filters.manufacturer
        )
          return <></>;

        return (
          <ProductCard product={product} onEdit={onEdit} key={product.sku} />
        );
      })}
    </>
  );
}
