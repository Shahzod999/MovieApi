import { User } from "@/types/userTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
}

const loadUserFromLocalStorage = (): User | null => {
  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      return null;
    }
  }
  return null;
};

const initialState: AuthState = {
  user: loadUserFromLocalStorage(),
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectedUser = (state: { auth: AuthState }) => state.auth.user;
export default authSlice.reducer;
