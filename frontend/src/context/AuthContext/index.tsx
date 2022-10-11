import { AxiosError } from 'axios'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { api } from '../../services/api'
import { setAuthorizationHeader } from '../../services/interceptors'
import { createTokenCookies, getToken, removeTokenCookies } from '../../utils/tokenCookies'

interface User {
  email: string
  permissions: string[]
  roles: string[]
}

interface AccountDetails {
  email: string
  firstName: string
  lastName: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void | AxiosError>
  signOut: () => void
  getUserDetails: () => Promise<void | AxiosError>
  user: User
  accountDetails: AccountDetails
  isAuthenticated: boolean
  loadingUserData: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>()
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>()
  const [loadingUserData, setLoadingUserData] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = getToken()
  const isAuthenticated = Boolean(token)
  const userData = user as User
  const accountData = accountDetails as AccountDetails

  async function signIn ({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/login/', { email, password })
      const { access, refresh, permissions, roles } = response.data

      createTokenCookies(access, refresh)
      setUser({ email, permissions, roles })
      setAccountDetails({ email: email, firstName: response.data.first_name, lastName: response.data.last_name })
      setAuthorizationHeader(api.defaults, access)
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  function signOut (pathname = '/login') {
    removeTokenCookies()
    setUser(null)
    setAccountDetails(null)
    setLoadingUserData(false)
    navigate(pathname)
  }

  useEffect(() => {
    if (!token) signOut(pathname)
  }, [pathname, token])

  useEffect(() => {
    const token = getToken()

    async function getUserData () {
      setLoadingUserData(true)

      try {
        const response = await api.get('/user/')

        if (response?.data) {
          const { email, permissions, roles } = response.data
          setUser({ email, permissions, roles })
          setAccountDetails({ email: email, firstName: response.data.first_name, lastName: response.data.last_name })
        }
      } catch (error) {
        signOut()
      }

      setLoadingUserData(false)
    }

    if (token) {
      setAuthorizationHeader(api.defaults, token)
      getUserData()
    }
  }, [])

  async function getUserDetails () {
    setLoadingUserData(true)

    try {
      const response = await api.get('/user/')

      if (response?.data) {
        setAccountDetails({ email: response.data.email, firstName: response.data.first_name, lastName: response.data.last_name })
      }
    } catch (error) {
      signOut()
    }

    setLoadingUserData(false)
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user: userData,
      accountDetails: accountData,
      loadingUserData,
      signIn,
      signOut,
      getUserDetails
    }}>
      {children}
    </AuthContext.Provider>
  )
}
