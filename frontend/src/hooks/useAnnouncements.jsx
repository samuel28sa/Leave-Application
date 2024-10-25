import { useEffect, useState } from "react";
import { getAnnouncements } from "../api/service";
import useProfile from "./useProfile";

const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useProfile();
  const isAdmin = user?.role === "admin";

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  return {
    announcements,
    loading,
    error,
    refresh: fetchData,
  };
};

export default useAnnouncements;
