import { apiSlice } from "./ApiSlice";

export const BaseApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            keepUnusedDataFor: 60
        })
    })
})

export const { useGetUsersQuery } = BaseApiSlice