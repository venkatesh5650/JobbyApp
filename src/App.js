// App Component — clean, minimal, interviewer‑friendly routing comments

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Jobs from './pages/Jobs/Jobs'
import JobItemDetails from './pages/JobItemDetails/JobItemDetails'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFound from './pages/NotFound/NotFound'

import './App.css'

// Application-level routing configuration
// ProtectedRoute ensures authenticated-only access
const App = () => (
  <Switch>
    {/* Public Route: Login */}
    <Route exact path="/login" component={Login} />

    {/* Authenticated Routes */}
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />

    {/* Not Found */}
    <Route path="/not-found" component={NotFound} />

    {/* Redirect any unknown path */}
    <Redirect to="not-found" />
  </Switch>
)

export default App
