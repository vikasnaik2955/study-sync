import { baseApi } from '../../app/baseApi';
import { userUpdated } from '../auth/authSlice';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => '/users/me',
      providesTags: ['Me'],
    }),
    updateProfile: build.mutation({
      query: (body) => ({ url: '/users/me', method: 'PATCH', body }),
      invalidatesTags: ['Me'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(userUpdated(data));
      },
    }),
    changePassword: build.mutation({
      query: (body) => ({ url: '/users/me/password', method: 'POST', body }),
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation, useChangePasswordMutation } = usersApi;
