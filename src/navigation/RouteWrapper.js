import Login from "../pages/Login/Login"
import { Route, Routes } from "react-router-dom"
import Layout from "../components/Layout"
import RequireAuth from "../components/auth/RequireAuth"
import Register from "../pages/Register/Register"
import ListProd from "../pages/ListProd/ListProd"

export default function RouteWrapper() {

    return (
        <Routes>
            <Route path="/" element={<Layout />} />
                <Route path="login" element={<Login />} />
                <Route path="regiter" element={<Register />} />
            <Route element={<RequireAuth />}>
                <Route index path="list" element={<ListProd />} />
            </Route>
        </Routes>
    )
}