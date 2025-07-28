
import { createContext } from "react"
import type { User } from "../types/User"

export interface AuthContextType {
    isLoggedIn: boolean
    user: User | null // Add user property
    login: (accessToken: string) => void
    logout: () => void
    isAuthenticating: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)