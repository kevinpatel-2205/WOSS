import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return {
    status: "success",
    message: "User fetched successfully",
    data: [
      {
        id: 1,
        name: "Kevin",
        age: 21,
      },
      {
        id: 2,
        name: "Het",
        age: 21,
      },
      {
        id: 3,
        name: "Rafiudin",
        age: 22,
      },
      {
        id: 4,
        name: "Jainish",
        age: 23,
      },
    ],
  };
});

const initialState = {
  loading: false,
  status: "",
  message: "",
  users: [],
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.users = action.payload.data;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
