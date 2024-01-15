// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Ticket } from '@acme/shared-models';

export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3333/api/tickets',
        credentials: "same-origin",
    }),
    endpoints: (builder) => ({
        getTickets: builder.query<Ticket[], void>({
            query: () => ''
        }),
        getTicketById: builder.query<Ticket, number>({
            query: (id) => `${id}`,
        }),
    }),
})

export const { useGetTicketsQuery, useGetTicketByIdQuery } = ticketApi