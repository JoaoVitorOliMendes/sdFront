import { apiSlice } from "./ApiSlice"

export const LogoutApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET'
            })
        })
    })
})

export const { useLogoutMutation } = LogoutApiSlice