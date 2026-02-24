import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  vc: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  vc: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.vc = action.payload.vc;
    },
    logout(state) {
      state.token = null;
      state.vc = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
