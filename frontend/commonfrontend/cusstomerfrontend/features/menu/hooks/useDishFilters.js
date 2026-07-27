import { useMemo, useState } from 'react';

const useDishFilters = (items = []) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState([]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      const dietaryMatch = selectedDietary.length === 0 || selectedDietary.every((tag) => item.dietary?.includes(tag));
      return categoryMatch && dietaryMatch;
    });
  }, [items, selectedCategory, selectedDietary]);

  return { selectedCategory, setSelectedCategory, selectedDietary, setSelectedDietary, filteredItems };
};

export default useDishFilters;
