import { configureStore } from "@reduxjs/toolkit";
import { reducerMovies } from "./movies";
import { reducerUserData } from "./user-data";

const store = configureStore({
  reducer: { movies: reducerMovies, userData: reducerUserData },
});

export default store;
