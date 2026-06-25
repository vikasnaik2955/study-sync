import { createSlice } from '@reduxjs/toolkit';

// Auth/session state lives in a plain slice (not RTK Query): tokens + the current user, mirrored
// to localStorage so a refresh keeps you signed in. RTK Query reads the access token from here.
const STORAGE_KEY = 'studysync.auth';

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupt storage */
  }
  return { accessToken: null, refreshToken: null, user: null };
}

function persist(state) {
  const { accessToken, refreshToken, user } = state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken, user }));
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitial(),
  reducers: {
    // Accepts a TokenResponse { accessToken, refreshToken, user }
    credentialsReceived(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      persist(state);
    },
    userUpdated(state, action) {
      state.user = action.payload;
      persist(state);
    },
    loggedOut(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { credentialsReceived, userUpdated, loggedOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.accessToken);
