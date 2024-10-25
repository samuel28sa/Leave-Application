import { useEffect, useState } from "react";
// import {  getRequests } from "../api/service";
import useProfile from "./useProfile";
import { getDashboardStats } from "../api/service";

export default function () {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getDashboardStats();
      setStats(data)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { stats, loading, error, refresh: fetchData }

}