// useFetchProducts.js
import { useState, useEffect } from "react";
import { GET, POST, PUT, DELETE } from "../APICalls"; // Assuming an API module exists

export default function useFetchProducts() {
  const [productData, setProductData] = useState({
    allProducts: [],
    isLoading: true,
    status: { connection: true, statusCode: 200 },
  });

  async function fetchData() {
    setProductData({ ...productData, isLoading: true });
    const response = await GET();
    const newStatus = { ...productData.status };

    if (response === undefined) {
      newStatus.connection = false;
      newStatus.statusCode = undefined;
      setProductData({ ...productData, status: newStatus, isLoading: false });
      return;
    }
    newStatus.connection = true;
    newStatus.statusCode = response.status;
    setProductData({
      isLoading: false,
      allProducts: response.data,
      status: newStatus,
    });
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleForm = async (e, original, updated) => {
    let fetchResults;
    switch (e.target.name.toUpperCase()) {
      case "DELETE":
        fetchResults = await DELETE(original.id);
        break;
      default:
        fetchResults =
          original.id === undefined
            ? await POST(updated)
            : updated.id === original.id
            ? await PUT(updated, original.id)
            : "handle error"; //id changed. but shouldn't have
        break;
    }
    if (fetchResults === undefined) {
      setProductData({ ...productData, status: { connection: false } });
      return;
    }
    const newStatus = { connection: true, statusCode: fetchResults.status };
    setProductData({ ...productData, status: newStatus });
    if (Math.floor(newStatus.statusCode / 100) === 2) fetchData();
  };

  return { productData, setProductData, fetchData, handleForm };
}
