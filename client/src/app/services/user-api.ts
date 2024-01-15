// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '@acme/shared-models';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3333/api/users',
        credentials: "same-origin",
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => ''
        }),
        getUserById: builder.query<User, number>({
            query: (id) => `${id}`,
        }),
    }),
})

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi