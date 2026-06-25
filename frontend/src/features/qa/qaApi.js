import { baseApi } from '../../app/baseApi';

export const qaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listQuestions: build.query({
      query: ({ subjectId, q, page = 0, size = 20 } = {}) => ({
        url: '/questions',
        params: { subjectId: subjectId || undefined, q: q || undefined, page, size },
      }),
      providesTags: ['Questions'],
    }),
    getQuestion: build.query({
      query: (id) => `/questions/${id}`,
      providesTags: (r, e, id) => [{ type: 'Question', id }],
    }),
    askQuestion: build.mutation({
      query: (body) => ({ url: '/questions', method: 'POST', body }),
      invalidatesTags: ['Questions'],
    }),
    postAnswer: build.mutation({
      query: ({ id, body }) => ({ url: `/questions/${id}/answers`, method: 'POST', body: { body } }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Question', id }],
    }),
    voteAnswer: build.mutation({
      query: ({ answerId, value }) => ({ url: `/answers/${answerId}/vote`, method: 'POST', body: { value } }),
      invalidatesTags: (r, e, { questionId }) => [{ type: 'Question', id: questionId }],
    }),
    retractVote: build.mutation({
      query: ({ answerId }) => ({ url: `/answers/${answerId}/vote`, method: 'DELETE' }),
      invalidatesTags: (r, e, { questionId }) => [{ type: 'Question', id: questionId }],
    }),
  }),
});

export const {
  useListQuestionsQuery,
  useGetQuestionQuery,
  useAskQuestionMutation,
  usePostAnswerMutation,
  useVoteAnswerMutation,
  useRetractVoteMutation,
} = qaApi;
