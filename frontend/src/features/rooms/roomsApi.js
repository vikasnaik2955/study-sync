import { baseApi } from '../../app/baseApi';

export const roomsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listRooms: build.query({
      query: ({ subjectId, page = 0, size = 20 } = {}) => ({
        url: '/rooms',
        params: { subjectId: subjectId || undefined, page, size },
      }),
      providesTags: ['Rooms'],
    }),
    getRoom: build.query({
      query: (id) => `/rooms/${id}`,
      providesTags: (r, e, id) => [{ type: 'Room', id }],
    }),
    createRoom: build.mutation({
      query: (body) => ({ url: '/rooms', method: 'POST', body }),
      invalidatesTags: ['Rooms'],
    }),
    joinRoom: build.mutation({
      query: (id) => ({ url: `/rooms/${id}/join`, method: 'POST' }),
      invalidatesTags: (r, e, id) => ['Rooms', { type: 'Room', id }],
    }),
    leaveRoom: build.mutation({
      query: (id) => ({ url: `/rooms/${id}/leave`, method: 'DELETE' }),
      invalidatesTags: (r, e, id) => ['Rooms', { type: 'Room', id }],
    }),
    shareNoteToRoom: build.mutation({
      query: ({ id, noteId }) => ({ url: `/rooms/${id}/notes/${noteId}`, method: 'POST' }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Room', id }],
    }),
    endRoom: build.mutation({
      query: (id) => ({ url: `/rooms/${id}/end`, method: 'POST' }),
      invalidatesTags: (r, e, id) => ['Rooms', { type: 'Room', id }],
    }),
  }),
});

export const {
  useListRoomsQuery,
  useGetRoomQuery,
  useCreateRoomMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useShareNoteToRoomMutation,
  useEndRoomMutation,
} = roomsApi;
