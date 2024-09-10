import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../features/auth/AuthSlice"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Navbar from "../navbar/Navbar"

export default function RequireAuth() {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    return (
      token ?
      (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-700">
          <Navbar />
          <Outlet />
        </div>
      )
      :
      <Navigate to='/' state={{ from: location }} replace />
    )
}