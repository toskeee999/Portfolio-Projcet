import { createSlice } from "@reduxjs/toolkit";

const userData = createSlice({
  name: "user-data",
  initialState: {
    coments: [],
    userAuth: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    setUserAuth(state, action) {
      state.userAuth = action.payload;
    },
    setComent(state, action) {
      const newComent = {
        coment: action.payload.value,
        itemId: action.payload.itemId,
        userName: state.userAuth.userName,
        id: Math.random(),
      };

      state.coments = [newComent, ...state.coments];
    },
  },
});

export const actionUserData = userData.actions;
export const reducerUserData = userData.reducer;
