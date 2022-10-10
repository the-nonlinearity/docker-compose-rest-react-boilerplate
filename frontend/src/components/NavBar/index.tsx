import { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { FaSignInAlt, FaUser, FaHome, FaSignOutAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { CanAccess } from '../CanAccess'

export function NavBar () {
  const { isAuthenticated, signOut } = useContext(AuthContext)

  return (
    <>
    <Navbar bg='dark' variant='dark'>
      <Container className='justify-content-center'>
        <Nav>

        <Nav.Link as={Link} to="/"><FaHome /> Home</Nav.Link>

            {!isAuthenticated ? <Nav.Link as={Link} to="/register"><FaUser /> Register </Nav.Link> : <Nav.Link as={Link} to="/account"><FaUser /> Account </Nav.Link>}
            {!isAuthenticated
              ? <Nav.Link as={Link} to="/login"> <FaSignInAlt /> Login </Nav.Link>
              : <Nav.Link as={Button} variant="dark" bg="dark" data-testid="logout-button"
                onClick={() => signOut()}> <FaSignOutAlt /> Logout </Nav.Link>
         }

        <CanAccess permissions={['users.list']}>
        <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </CanAccess>

        <CanAccess permissions={['metrics.list']}>
        <Nav.Link as={Link} to="/metrics">Metrics</Nav.Link>
        </CanAccess>

      {/* {isAuthenticated && (
        <>
          <span>{user?.email}</span>
          <Button
          data-testid="logout-button"
          onClick={() => signOut()}
          variant="dark"
        > Logout
        </Button>
        </>
      )} */}
          </Nav>
        </Container>
    </Navbar>
    </>
  )
}
