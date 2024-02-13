// reducers/index.js
import { combineReducers } from "redux";
import favoriteReducer from "./favoriteReducer ";

const rootReducer = combineReducers({
  favorites: favoriteReducer,
});

export default rootReducer;
