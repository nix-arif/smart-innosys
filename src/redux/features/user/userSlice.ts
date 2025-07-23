import { createSession } from "@/lib/session";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export interface User {
  id: string;
  username: string;
  email: string;
  hashedPassword: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  postcode: string;
  province: string;
  country: string;
  department: string;
  epfNo: string;
  fullname: string;
  icNo: string;
  phoneNo: string;
  role: string;
  socsoNo: string;
}

interface UserState {
  loading: boolean;
  user: User;
  error: string;
}

const initialState: UserState = {
  loading: false,
  user: {
    id: "",
    username: "",
    email: "",
    hashedPassword: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    postcode: "",
    province: "",
    country: "",
    department: "",
    epfNo: "",
    fullname: "",
    icNo: "",
    phoneNo: "",
    role: "",
    socsoNo: "",
  },
  error: "",
};

export const register = createAsyncThunk(
  "user/register",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/register", userData);
      const user = response.data.createdUser;

      if (user.id) {
        await axios.post("/api/session/createSession", {
          userId: user.id,
        });
      }
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const getLoginUser = createAsyncThunk(
  "user/getLoginUser",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/user/login", userData);
      const user = response.data.userData;

      if (user.id) {
        await axios.post("/api/session/createSession", {
          userId: user.id,
        });
      }
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.post("/api/session/deleteSession", {});
    return null;
  } catch (err: any) {
    console.error("Logout error:", err);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromStorage: (state, action) => {
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.loading = false;
        state.error = "";

        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder.addCase(logout.fulfilled, (state, action) => {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      state.user = initialState.user;
    });
    builder.addCase(register.pending, () => {});
    builder.addCase(register.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default userSlice.reducer;
export const { setUserFromStorage } = userSlice.actions;
