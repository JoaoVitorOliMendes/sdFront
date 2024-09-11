import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '../auth/AuthSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    // 403 if access token is expired, was valid but now expired
    if (result?.error?.originalStatus === 403) {
        // /refresh is the endpoint to refresh token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryReAuth,
    endpoints: builder => ({})
})