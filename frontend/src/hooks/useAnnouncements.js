import { useEffect, useState } from "react";
import { getAnnouncements } from "../api/service";

const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
      console.log(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    announcements,
    loading,
    error,
    refresh: fetchData,
  };
};

export default useAnnouncements;
