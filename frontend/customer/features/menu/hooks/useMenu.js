import { useEffect, useState } from 'react';
import { getMenuItems } from '../services/menuService';

const useMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      const data = await getMenuItems();
      setItems(data);
      setLoading(false);
    };

    fetchMenu();
  }, []);

  return { items, loading };
};

export default useMenu;
