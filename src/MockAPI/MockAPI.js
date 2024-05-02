import data from "./testData.json";

let repo = data;

export const getAll = () => {
  return repo;
};

export const deleteProduct = (id) => {
  repo = repo.filter((obj) => obj.id !== id);
};

export const put = (updated, id) => {
  const old = () => {
    for (const product of repo) {
      if (product.id === id) return product;
    }
  };
  repo[repo.indexOf(old())] = updated;
};

export const create = (newObj) => {
  const biggestId = repo[repo.length - 1].id;
  const createdObj = { id: biggestId + 1, ...newObj };
  return createdObj;
};

export const post = (product) => {
  console.log(product);
  const fullProduct = create(product);
  repo = [fullProduct, ...repo];
  console.log(repo);
};
