import FavoriteButton from './components/FavoriteButton';
import FavoritesList from './components/FavoritesList';
import FavoriteCard from './components/FavoriteCard';
import FavoritesEmpty from './components/FavoritesEmpty';
import FavoritesSkeleton from './components/FavoritesSkeleton';
import useFavorites from './hooks/useFavorites';
import useFavoriteToggle from './hooks/useFavoriteToggle';
import favoritesService, { getFavorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, clearFavorites } from './services/favoritesService';
import Favorite from './types/favorites.types';

export { FavoriteButton, FavoritesList, FavoriteCard, FavoritesEmpty, FavoritesSkeleton };
export { useFavorites, useFavoriteToggle };
export { favoritesService, getFavorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, clearFavorites };
export { Favorite };

export default {
  FavoriteButton,
  FavoritesList,
  FavoriteCard,
  FavoritesEmpty,
  FavoritesSkeleton,
  useFavorites,
  useFavoriteToggle,
  favoritesService,
  Favorite,
};
