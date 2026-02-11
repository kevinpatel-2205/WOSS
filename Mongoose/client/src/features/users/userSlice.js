import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}getUsers?page=${page}&limit=${limit}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  },
);

export const seedUsers = createAsyncThunk(
  "users/seedUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}loadUsers`);
      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    message: "",
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalUsers: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.result;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalUsers = action.payload.totalUsers;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(seedUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(seedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })

      .addCase(seedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
