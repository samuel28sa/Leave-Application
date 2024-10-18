import { useEffect, useState } from "react";
import {  getRequests } from "../api/service";
import useProfile from "./useProfile";

export default function (id) {
    const {us} = useProfile()
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRequests(id);
      setRequests(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { requests, loading, error, refresh: fetchData }

}