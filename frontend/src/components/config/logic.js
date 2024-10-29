export const isPresentInFavorites = (favorites = [], Restaurant) => {
  return (
    Array.isArray(favorites) &&
    favorites.some((fav) => fav.id === Restaurant.id)
  );
};
