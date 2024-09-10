import { apiSlice } from "./ApiSlice"

export const RefreshApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        refresh: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'GET'
            })
        })
    })
})

export const { useRefreshMutation } = RefreshApiSlice