import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { credentialsReceived, loggedOut } from '../features/auth/authSlice';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

// Wraps the base query so that a 401 transparently triggers one refresh-token rotation and a
// single retry. If refresh fails, we clear the session. This is the client half of the access +
// rotating-refresh design.
async function baseQueryWithReauth(args, api, extraOptions) {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = api.getState().auth.refreshToken;
    if (refreshToken) {
      const refresh = await rawBaseQuery(
        { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
        api,
        extraOptions,
      );
      if (refresh.data) {
        api.dispatch(credentialsReceived(refresh.data));
        result = await rawBaseQuery(args, api, extraOptions); // retry the original request
      } else {
        api.dispatch(loggedOut());
      }
    } else {
      api.dispatch(loggedOut());
    }
  }
  return result;
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  // Keep data in sync without a manual reload: refetch active queries when the tab regains focus
  // or the network reconnects. (setupListeners is wired in store.js.)
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Notes', 'Subjects', 'Groups', 'GroupMembers', 'GroupNotes', 'GroupPosts',
    'Questions', 'Question', 'Conversations', 'Messages', 'Rooms', 'Room', 'Me'],
  endpoints: () => ({}),
});
