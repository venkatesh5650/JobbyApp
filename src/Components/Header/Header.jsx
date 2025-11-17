import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {BsBriefcase} from 'react-icons/bs'

import './index.css'

/**
 * Header Component
 * - Displays navigation links and logout button
 * - Uses withRouter to access history object for redirection
 */
const Header = props => {
  /**
   * Clears JWT token and redirects user to login page
   */
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login') // Redirect user after logout
  }

  return (
    <div className="headerContainer">
      {/* Website Logo - Navigates to Home */}
      <Link to="/">
        <button className="logoBtn" type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="webLogo"
          />
        </button>
      </Link>

      {/* Navigation for Small Screens */}
      <ul className="smallScreenContainer">
        <li>
          <Link to="/">
            <button className="headerBtn" type="button">
              <IoMdHome className="icon" />
            </button>
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <button className="headerBtn" type="button">
              <BsBriefcase className="icon" />
            </button>
          </Link>
        </li>
        <li>
          {/* Logout Icon */}
          <button className="headerBtn" type="button" onClick={onClickLogout}>
            <IoIosLogOut className="icon" />
          </button>
        </li>
      </ul>

      {/* Navigation for Large Screens */}
      <ul className="largeScreenContainer">
        <li>
          <Link to="/">
            <button className="headerBtn" type="button">
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <button className="headerBtn" type="button">
              Jobs
            </button>
          </Link>
        </li>
      </ul>

      {/* Logout Button for Large Screens */}
      <div className="logoutContainer">
        <button className="logoutBtn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
