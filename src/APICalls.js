export const GET = async () => {
  const res = { status: undefined, data: undefined };
  return fetch("http://localhost:8085/products", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => {
      res.status = response.status;
      return response.json();
    })
    .then((data) => {
      res.data = data;
      return res;
    })
    .catch(() => {
      return undefined;
    });
};

export const PUT = async (updatedProduct, id) => {
  const product = JSON.stringify(updatedProduct);
  return fetch(`http://localhost:8085/products/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: product,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};

export const POST = async (product) => {
  product = JSON.stringify(product);
  return fetch("http://localhost:8085/products", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: product,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json();
        //   .then((errorResponse) => {
        //   throw errorResponse; // Throw the error response object
        // });
      }
      return response;
    })
    .catch(() => {
      return undefined;
    });
};

export const DELETE = async (id) => {
  return fetch(`http://localhost:8085/products/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};
