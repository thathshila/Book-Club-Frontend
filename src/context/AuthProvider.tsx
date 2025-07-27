import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import apiClient, { setHeader } from "../services/apiClient"
import { getLoggedInUser } from "../services/authService"
import router from "../router"
import type { User } from "../types/User"

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [accessToken, setAccessToken] = useState<string>("")
    const [user, setUser] = useState<User | null>(null) // Add user state
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)

    // Function to fetch user data
    const fetchUserData = async (token: string) => {
        try {
            // Set the token header first
            setHeader(token)
            // Then fetch user data
            const userData = await getLoggedInUser()
            setUser(userData)
            return userData
        } catch (error) {
            console.error("Failed to fetch user data:", error)
            setUser(null)
            return null
        }
    }

    const login = async (token: string) => {
        setAccessToken(token)
        setIsLoggedIn(true)

        // Fetch user data after login
        const userData = await fetchUserData(token)

        // Navigate based on user role or default to dashboard
        if (userData) {
            router.navigate("/dashboard")
        }
    }

    const logout = () => {
        setIsLoggedIn(false)
        setAccessToken("")
        setUser(null) // Clear user data
        setHeader("") // Clear auth header
        router.navigate("/login")
    }

    useEffect(() => {
        setHeader(accessToken)
    }, [accessToken])

    useEffect(() => {
        const tryRefresh = async () => {
            try {
                const result = await apiClient.post("/auth/refresh-token")
                const token = result.data.accessToken

                setAccessToken(token)
                setIsLoggedIn(true)

                // Fetch user data after token refresh
                await fetchUserData(token)

                const currentPath = window.location.pathname
                if (currentPath === "/login" || currentPath === "/signup" || currentPath === "/") {
                    router.navigate("/dashboard")
                }
            } catch (error) {
                setAccessToken("")
                setIsLoggedIn(false)
                setUser(null) // Clear user data on error
            } finally {
                setIsAuthenticating(false)
            }
        }

        tryRefresh()
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            user, // Include user in context
            login,
            logout,
            isAuthenticating
        }}>
            {children}
        </AuthContext.Provider>
    )
}