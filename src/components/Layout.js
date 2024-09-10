import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRefreshMutation } from "../features/api/RefreshApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/AuthSlice";

export default function Layout() {
    const [refresh, { isLoading }] = useRefreshMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        refresh()
            .unwrap()
            .then((val) => {
                dispatch(setCredentials({...val, user: val.username}))
                navigate('/list')
            })
            .catch((reason) => {
                navigate('/login')
                console.error(reason)
            })
    }, [])
    
    return (
        <Outlet />
    )
}