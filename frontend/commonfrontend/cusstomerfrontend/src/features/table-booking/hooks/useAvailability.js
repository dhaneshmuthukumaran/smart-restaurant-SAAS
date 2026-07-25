import { useEffect, useState } from 'react';
import { getAvailability } from '../services/bookingService';

export const useAvailability = () => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAvailability = async () => {
      setLoading(true);
      const data = await getAvailability();
      if (mounted) {
        setAvailability(data);
        setLoading(false);
      }
    };

    fetchAvailability();

    return () => {
      mounted = false;
    };
  }, []);

  return { availability, loading };
};
