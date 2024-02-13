export const ADD_FAVITEM = "ADD_FAVITEM";
export const REMOVE_FAVITEM = "REMOVE_FAVITEM";

// actions/favoritesActions.js
export const addFavorite = (item) => ({
  type: "ADD_FAVITEM",
  payload: item,
});

export const removeFavorite = (itemId) => ({
  type: "REMOVE_FAVITEM",
  payload: itemId,
});
