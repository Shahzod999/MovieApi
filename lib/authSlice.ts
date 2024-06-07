import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
  foto?: string;
}

export interface ProviderDaum {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
}

export interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

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
    login: (state, action: PayloadAction<User>) => {
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
