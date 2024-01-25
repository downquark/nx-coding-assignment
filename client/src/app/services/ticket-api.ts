// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Ticket } from '@acme/shared-models';

export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3333/api/tickets',
        credentials: "same-origin",
    }),
    tagTypes: ['Tickets'],
    endpoints: (builder) => ({
        getTickets: builder.query<Ticket[], void>({
            query: () => '',
            // Provides a list of `Tickets` by `id`.
            // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
            // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Tickets` element was added.
            providesTags: (result) =>
            // is result available?
            result
            ? // successful query
            [
            ...result.map(({ id }) => ({ type: 'Tickets', id } as const)),
            { type: 'Tickets', id: 'LIST' },
            ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'Tickets', id: 'LIST' }` is invalidated
            [{ type: 'Tickets', id: 'LIST' }],
        }),
        getTicketById: builder.query<Ticket, number>({
            query: (id) => `${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Tickets', id }],
        }),
        addTicket: builder.mutation<Ticket, Partial<Ticket>>({
          query(body) {
            return {
              url: '',
              method: 'POST',
              body,
            }
          },
          // Invalidates all Ticket-type queries providing the `LIST` id - after all, depending of the sort order,
          // that newly created ticket could show up in any lists.
          invalidatesTags: [{ type: 'Tickets', id: 'LIST' }],
        }),
        assignTicket: builder.mutation<any, { ticketId: number; userId: number }>({
            query: ({ ticketId, userId }) => ({
                url: `${ticketId}/assign/${userId}`,
                method: 'PUT'
            }),
            // Invalidates all queries that subscribe to this Ticket `id` only.
            // In this case, `getTicket` will be re-run. `getTickets` *might*  rerun, if this id was under its results.
            invalidatesTags: (_result, _error, { ticketId }) => [{ type: 'Tickets', ticketId }, { type: 'Tickets', id: 'LIST' }],
        }),
        unassignTicket: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}/unassign`,
                method: 'PUT'
            }),
            // Invalidates all queries that subscribe to this Ticket `id` only.
            // In this case, `getTicket` will be re-run. `getTickets` *might*  rerun, if this id was under its results.
            invalidatesTags: (_result, _error, id) => [{ type: 'Tickets', id }, { type: 'Tickets', id: 'LIST' }],
        }),
        completeTicket: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}/complete`,
                method: 'PUT'
            }),
            // Invalidates all queries that subscribe to this Ticket `id` only.
            // In this case, `getTicket` will be re-run. `getTickets` *might*  rerun, if this id was under its results.
            invalidatesTags: (_result, _error, id) => [{ type: 'Tickets', id }, { type: 'Tickets', id: 'LIST' }],
        }),
        incompleteTicket: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}/complete`,
                method: 'DELETE'
            }),
            // Invalidates all queries that subscribe to this Ticket `id` only.
            // In this case, `getTicket` will be re-run. `getTickets` *might*  rerun, if this id was under its results.
            invalidatesTags: (_result, _error, id) => [{ type: 'Tickets', id }, { type: 'Tickets', id: 'LIST' }],
        })
    }),
})

export const { useGetTicketsQuery, useGetTicketByIdQuery, useAddTicketMutation, useAssignTicketMutation, useUnassignTicketMutation, useCompleteTicketMutation, useIncompleteTicketMutation } = ticketApi