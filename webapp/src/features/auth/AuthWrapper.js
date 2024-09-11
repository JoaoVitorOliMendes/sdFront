import { createContext, useContext, useState } from "react"


export const AuthContext = createContext()

export const AuthData = () => useContext(AuthContext)

export default function AuthWrapper({
    children
}) {
    const [ auth, setAuth ] = useState({ isAuthenticated: false })

    const login = (username, password) => {
        return new Promise((resolve,  reject) => {
            if (password==='12345') {
                setAuth({ isAuthenticated: true })
                resolve('success')
            } else {
                reject('failed')
            }
        })
    }

    const logout = () => {
        setAuth({ isAuthenticated: false })
    }


    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}