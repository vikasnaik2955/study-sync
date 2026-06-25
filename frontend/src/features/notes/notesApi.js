import { baseApi } from '../../app/baseApi';

export const notesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listNotes: build.query({
      query: ({ subjectId, q, page = 0, size = 20 } = {}) => ({
        url: '/notes',
        params: { subjectId: subjectId || undefined, q: q || undefined, page, size },
      }),
      providesTags: ['Notes'],
    }),
    uploadNote: build.mutation({
      // Expects a FormData with title, subjectId, file
      query: (formData) => ({ url: '/notes', method: 'POST', body: formData }),
      invalidatesTags: ['Notes'],
    }),
    deleteNote: build.mutation({
      query: (id) => ({ url: `/notes/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Notes'],
    }),
  }),
});

export const { useListNotesQuery, useUploadNoteMutation, useDeleteNoteMutation } = notesApi;
