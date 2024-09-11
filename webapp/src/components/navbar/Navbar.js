import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/AuthSlice";
import { useLogoutMutation } from "../../features/api/LogoutSlice";

export default function Navbar() {
    const navigate = useNavigate()

    const [apiLogout = (logout), { isLoading }] = useLogoutMutation()
    const dispatch = useDispatch()

    const handleLogOut = async () => {
        try {
            apiLogout()
                .unwrap()
                .then(() => {
                    console.log('123123');
                    dispatch(logout())
                    navigate('/')
                })
                .catch((reason) => console.log(reason))
        } catch (error) {
            console.error(error)
        }
        navigate('/')
    }

    return (
        <nav className="bg-red-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
                <button  type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <Link to="list" className="text-lg block p-4 hover:text-gray-100 text-gray-900 md:hover:bg-transparent lnkFocus">List</Link>
                        </li>
                        <li>
                            <Link to="product/register" className="text-lg block p-4 hover:text-gray-100 text-gray-900 md:hover:bg-transparent">Register Product</Link>
                        </li>
                        <li>
                            <Link to="cart" className="text-lg block p-4 hover:text-gray-100 text-gray-900 md:hover:bg-transparent">Cart</Link>
                        </li>
                        <li>
                            <button onClick={handleLogOut} className="text-lg block p-4 hover:text-gray-100 text-gray-900 md:hover:bg-transparent">LogOut</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}