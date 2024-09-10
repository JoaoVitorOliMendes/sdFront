import { apiSlice } from "./ApiSlice"

export const RegisterApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: '/register',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})

export const { useRegisterMutation } = RegisterApiSlice