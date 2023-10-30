import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useFetchData(url, querry = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${querry}`);
        setData(data);
      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url, querry]);
  return { isLoading, data };
}

export default useFetchData;
