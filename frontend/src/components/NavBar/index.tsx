import { useContext } from 'react'
import { FaSignInAlt, FaUser, FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { CanAccess } from '../CanAccess'

export function NavBar () {
  const { isAuthenticated, user, signOut } = useContext(AuthContext)

  return (
    <div>
      <Link to="/login"> <FaSignInAlt /> Login </Link>
      <Link to="/register"><FaUser /> Register </Link>
      <Link to="/"><FaHome /> Home</Link>

      <CanAccess permissions={['users.list']}>
        <Link to="/users">Users</Link>
      </CanAccess>

      <CanAccess permissions={['metrics.list']}>
        <Link to="/metrics">Metrics</Link>
      </CanAccess>

      {isAuthenticated && (
        <>
          <span>{user?.email}</span>
          <button data-testid="logout-button" onClick={() => signOut()}>
            Logout
          </button>
        </>
      )}
    </div>
  )
}
