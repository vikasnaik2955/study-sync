import { baseApi } from '../../app/baseApi';

export const subjectsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listSubjects: build.query({
      query: (q) => ({ url: '/subjects', params: q ? { q } : undefined }),
      providesTags: ['Subjects'],
    }),
  }),
});

export const { useListSubjectsQuery } = subjectsApi;
