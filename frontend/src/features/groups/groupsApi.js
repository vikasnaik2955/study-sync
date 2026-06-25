import { baseApi } from '../../app/baseApi';

export const groupsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listGroups: build.query({
      query: ({ subjectId, q, page = 0, size = 20 } = {}) => ({
        url: '/groups',
        params: { subjectId: subjectId || undefined, q: q || undefined, page, size },
      }),
      providesTags: ['Groups'],
    }),
    getGroup: build.query({
      query: (id) => `/groups/${id}`,
      providesTags: (r, e, id) => [{ type: 'Groups', id }],
    }),
    createGroup: build.mutation({
      query: (body) => ({ url: '/groups', method: 'POST', body }),
      invalidatesTags: ['Groups'],
    }),
    joinGroup: build.mutation({
      query: (id) => ({ url: `/groups/${id}/join`, method: 'POST' }),
      invalidatesTags: ['Groups', 'GroupMembers'],
    }),
    leaveGroup: build.mutation({
      query: (id) => ({ url: `/groups/${id}/leave`, method: 'DELETE' }),
      invalidatesTags: ['Groups', 'GroupMembers'],
    }),
    groupMembers: build.query({
      query: (id) => `/groups/${id}/members`,
      providesTags: ['GroupMembers'],
    }),
    groupNotes: build.query({
      query: (id) => `/groups/${id}/notes`,
      providesTags: ['GroupNotes'],
    }),
    shareNoteToGroup: build.mutation({
      query: ({ id, noteId }) => ({ url: `/groups/${id}/notes/${noteId}`, method: 'POST' }),
      invalidatesTags: ['GroupNotes'],
    }),
    groupPosts: build.query({
      query: ({ id, page = 0, size = 30 }) => ({ url: `/groups/${id}/posts`, params: { page, size } }),
      providesTags: ['GroupPosts'],
    }),
    createGroupPost: build.mutation({
      query: ({ id, body }) => ({ url: `/groups/${id}/posts`, method: 'POST', body: { body } }),
      invalidatesTags: ['GroupPosts'],
    }),
  }),
});

export const {
  useListGroupsQuery,
  useGetGroupQuery,
  useCreateGroupMutation,
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useGroupMembersQuery,
  useGroupNotesQuery,
  useShareNoteToGroupMutation,
  useGroupPostsQuery,
  useCreateGroupPostMutation,
} = groupsApi;
