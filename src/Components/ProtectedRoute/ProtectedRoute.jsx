import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

/**
 * ProtectedRoute
 * - Blocks access to routes that require authentication
 * - Checks for the presence of a valid JWT token in cookies
 * - Redirects unauthenticated users to the login page
 */
const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')

  // If JWT is missing → user is not authenticated
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  // If authenticated → allow access to requested route
  return <Route {...props} />
}

export default ProtectedRoute
