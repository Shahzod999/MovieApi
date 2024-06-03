import { createSlice } from "@reduxjs/toolkit";

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: ProviderDaum[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
  foto: string;
}

export interface ProviderDaum {
  providerId: string;
  uid: string;
  displayName: any;
  email: string;
  phoneNumber: any;
  photoURL: any;
}

export interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

interface AuthState {
  user: User | null;
}

// const getUserFromLocalStorage = (): User | null => {
//   const userData = localStorage.getItem("user");
//   return userData ? JSON.parse(userData) : null;
// };
// //...
// const initialState: AuthState = {
//   user: getUserFromLocalStorage(), //...
// };

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") as string) || null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
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
