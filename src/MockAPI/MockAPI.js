import data from "./testData.json";

const repo = data;

export const getAll = () => {
  return repo;
};

export const getById = (id) => {
  for (const obj of repo) {
    if (obj.id === id) return obj;
  }
};

export const deleteById = (id) => {
  repo = repo.filter((obj) => obj.id !== id);
};

export const updateById = (updated, id) => {
  const old = getById(id);
  repo[repo.indexOf(old)] = updated;
};

export const create = (newObj) => {
  const biggestId = repo[repo.length - 1].id;
  const createdObj = { id: biggestId + 1, ...newObj };
  return createdObj;
};
