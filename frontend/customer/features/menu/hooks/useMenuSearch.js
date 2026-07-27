import { useMemo, useState } from 'react';

const useMenuSearch = (items = []) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchedItems = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return items;

    return items.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(term));
  }, [items, searchTerm]);

  return { searchTerm, setSearchTerm, searchedItems };
};

export default useMenuSearch;
