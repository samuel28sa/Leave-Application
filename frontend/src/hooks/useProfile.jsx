import { useEffect, useState } from "react";
import { getProfile } from "../api/service";

export default function () {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setUser(data);
      console.log(data.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { user, loading, error, refresh: fetchData };
}
