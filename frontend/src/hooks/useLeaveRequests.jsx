import { useEffect, useState } from "react";
import { getLeaveRequests } from "../api/service";

export default function (userId) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getLeaveRequests(userId);
      setRequests(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return { requests, loading, error, refresh: fetchData };
}
