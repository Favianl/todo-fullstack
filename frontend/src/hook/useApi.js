import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await apiFunc(...args);
      setData(response);
      setLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setLoading(false);
      return Promise.reject(error);
    }
  };

  return { data, error, loading, request };
};

export default useApi;
