import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AdminState {
  id: number;
  role: string;
  email: string;
  isloggedIn?: boolean;
}

const initialState: AdminState = {
  id: 0,
  role: "",
  email: "",
  isloggedIn: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AdminState>) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.isloggedIn = true;
    },
    logout: (state) => {
      state.id = 0;
      state.role = "";
      state.email = "";
      state.isloggedIn = false;
    },
  },
});

export const { login, logout } = adminSlice.actions;
export const selectAdmin = (state: any) => state.admin;
export default adminSlice.reducer;