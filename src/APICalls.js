import { post, put, deleteProduct, getAll } from "./MockAPI/MockAPI";

export const GET = () => {
  return getAll();
};

export const PUT = (updatedProduct, id) => {
  put(updatedProduct, id);
};

export const POST = (product) => {
  post(product);
};

export const DELETE = (id) => {
  deleteProduct(id);
};
