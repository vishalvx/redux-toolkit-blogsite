import { createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = [
  { id: "1", name: "Vishal vx" },
  { id: "2", name: "Binod" },
  { id: "3", name: "Scammers" },
];
//create slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
//export selectors
export const selectAllUsers = (state) => state.users;
//export actions

//export reducer
export default usersSlice.reducer;
