import { baseApi } from '../../app/baseApi';

export const chatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listConversations: build.query({
      query: () => '/conversations',
      providesTags: ['Conversations'],
    }),
    openConversation: build.mutation({
      // body: { participantId } or { groupId }
      query: (body) => ({ url: '/conversations', method: 'POST', body }),
      invalidatesTags: ['Conversations'],
    }),
    conversationMessages: build.query({
      query: ({ id, page = 0, size = 30 }) => ({ url: `/conversations/${id}/messages`, params: { page, size } }),
      providesTags: (r, e, { id }) => [{ type: 'Messages', id }],
    }),
    uploadChatFile: build.mutation({
      query: ({ id, formData }) => ({ url: `/conversations/${id}/files`, method: 'POST', body: formData }),
    }),
  }),
});

export const {
  useListConversationsQuery,
  useOpenConversationMutation,
  useConversationMessagesQuery,
  useUploadChatFileMutation,
} = chatApi;
