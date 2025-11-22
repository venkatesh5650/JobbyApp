import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../../components_temp/Header/Header'
import './index.css'

/**
 * Home Page
 * - Shown only after successful authentication
 * - Protects the route by verifying JWT token in cookies
 * - Provides a simple call-to-action to navigate to the Jobs page
 */
const Home = () => {
  const jwtToken = Cookies.get('jwt_token')

  // If no token → user is not logged in → redirect to login page
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      {/* Reusable navigation header */}
      <Header />

      {/* Hero Section */}
      <div className="homeContainer">
        <h1 className="title">Find The Job That Fits Your Life</h1>

        <p className="content">
          Millions of people are searching for jobs, salary information, and
          company reviews. Find the job that fits your abilities and potential.
        </p>

        {/* CTA Button to Jobs Page */}
        <Link to="/jobs">
          <button className="findJobBtn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
