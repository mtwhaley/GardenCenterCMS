export const statusCodeMessages = {
  404: "non-existent product id",
  409: "sku is already in use by another product",
  400: "invalid product submitted",
};

export const defaultProduct = {
  sku: undefined,
  name: "",
  description: "",
  type: "",
  manufacturer: "",
  price: "",
};
export const getUniques = (visibleProducts) => {
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
};

export const filterProductsBySearch = (allProducts, search) => {
  return allProducts.filter((product) => {
    return product[search.field]
      .toString()
      .toLowerCase()
      .includes(search.query.toLowerCase());
  });
};

export const validFilters = (products, filters) => {
  const validity = { type: false, manufacturer: true };
  for (const product in products) {
    if (filters.typeFilter === product.type) {
      validity.type = true;
    }
    if (filters.manufacturerFilter === product.manufacturer) {
      validity.manufacturer = true;
    }
    if (validity.type && validity.manufacturer) break;
  }
  return validity;
};
