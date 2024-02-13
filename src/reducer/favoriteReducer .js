import { ADD_FAVITEM, REMOVE_FAVITEM } from "../actions";

const initialState = {
  favorites: [],
};
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVITEM:
      if (state.favorites.find((item) => item.isbn === action.payload.isbn)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVITEM:
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.isbn !== action.payload.isbn
        ),
      };
    default:
      return state;
  }
};

export default favoriteReducer;
