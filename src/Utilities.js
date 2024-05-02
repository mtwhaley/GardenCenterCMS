export const defaultProduct = {
  sku: undefined,
  name: "",
  description: "",
  type: "",
  manufacturer: "",
  price: "",
};
export function getUniques(visibleProducts) {
  const uniqueTypes = [];
  const uniqueManufacturers = [];
  for (const product of visibleProducts) {
    if (!uniqueTypes.includes(product.type)) uniqueTypes.push(product.type);
    if (!uniqueManufacturers.includes(product.manufacturer))
      uniqueManufacturers.push(product.manufacturer);
    uniqueTypes.sort();
    uniqueManufacturers.sort();
  }
  return { types: uniqueTypes, manufacturers: uniqueManufacturers };
}

export function filterProductsBySearch(allProducts, search) {
  return allProducts.filter((product) => {
    return product[search.field]
      .toString()
      .toLowerCase()
      .includes(search.query.toLowerCase());
  });
}
