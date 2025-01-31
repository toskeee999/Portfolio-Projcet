import { createSlice } from "@reduxjs/toolkit";

function deduplicateItems(existingList, newList) {
  const existingIds = new Set(existingList.map((item) => item.id));
  return [
    ...existingList,
    ...newList.filter((item) => !existingIds.has(item.id) && item.poster_path),
  ];
}

const movies = createSlice({
  name: "movies",
  initialState: {
    movies: {
      movieList: [],
      error: false,
      loading: false,
      page: 2,
    },
    shows: {
      showList: [],
      error: false,
      loading: false,
      page: 2,
    },
    favorites: [],
    inputSearchMovies: "",
  },
  reducers: {
    setItems(state, action) {
      if (action.payload.type === "movies") {
        const newMovies = action.payload.allItems;
        const combinedMovies = deduplicateItems(
          state.movies.movieList,
          newMovies
        );
        state.movies.movieList = combinedMovies;
      } else if (action.payload.type === "tv") {
        const newShows = action.payload.allItems;
        const combinedShows = deduplicateItems(state.shows.showList, newShows);
        state.shows.showList = combinedShows;
      }
    },
    setNextPage(state, action) {
      if (action.payload === "movies") {
        state.movies.page = state.movies.page + 1;
      } else if (action.payload === "tv") {
        state.shows.page = state.shows.page + 1;
      }
    },
    setError(state, action) {
      if (action.payload.type === "movies") {
        state.movies.error = action.payload.error;
      } else if (action.payload.type === "tv") {
        state.shows.error = action.payload.error;
      }
    },
    setLoader(state, action) {
      if (action.payload.type === "movies") {
        state.movies.loading = action.payload.boolean;
      } else if (action.payload.type === "tv") {
        state.shows.loading = action.payload.boolean;
      }
    },
    setInputSearchMovies(state, action) {
      state.inputSearchMovies = action.payload;
    },
    setInputSearchFalse(state) {
      state.inputSearchMovies = "";
    },
    setFavorites(state, action) {
      const newItem = action.payload;
      const existingItem = state.favorites.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== existingItem.id
        );
        return;
      }
      state.favorites.push(newItem);
    },
  },
});

export const actionMovies = movies.actions;
export const reducerMovies = movies.reducer;
