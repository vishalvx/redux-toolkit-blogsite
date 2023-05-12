import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersUrl } from "../../utils/Urls";
import axios from "axios";

// users url
const USERS_URL = usersUrl;

//initial state
const initialState = {
  users: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
//users thunk
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

//create slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "suceedded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
//export selectors
export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;
//export actions

//export reducer
export default usersSlice.reducer;
