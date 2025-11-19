// Login Component with clean, efficient, interviewer-friendly comments

import {Component} from 'react'
import Cookies from 'js-cookie'
import {loginUser} from '../../api'
import './index.css'

class Login extends Component {
  // Component-level state for storing form inputs and error message
  state = {userName: 'rahul', passWord: 'rahul@2021', errorMsg: ''}

  // Autofill login credentials
  autoFillCredentials = () => {
    this.setState({
      userName: 'rahul',
      passWord: 'rahul@2021',
      errorMsg: '',
    })
  }

  // Update username input
  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  // Update password input
  onChangePassword = event => {
    this.setState({passWord: event.target.value})
  }

  // Redirect user to home if JWT token already exists
  RedirectToHome = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  // Handle login submission
  onClickSubmit = async event => {
    event.preventDefault()

    const {userName, passWord} = this.state

    // API call for authentication
    const response = await loginUser(userName, passWord)

    if (response.ok === true) {
      const data = await response.json()

      // Store token in cookies for session management
      Cookies.set('jwt_token', data.jwt_token, {expires: 5})

      this.RedirectToHome()
    } else {
      const data = await response.json()

      // Reset inputs + show server error message
      this.setState({userName: '', passWord: '', errorMsg: data.error_msg})
    }
  }

  // -------------------- UI --------------------
  render() {
    const {userName, passWord, errorMsg} = this.state

    return (
      <div className="loginContainer">
        <div className="loginCard">
          <div className="logoContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websitelogo"
            />
          </div>

          {/* Login Form */}
          <form onSubmit={this.onClickSubmit}>
            {/* Username */}
            <div>
              <label htmlFor="username" className="inputlabel">
                USERNAME
              </label>
              <br />
              <div className="loginInputContainer">
                <input
                  className="inputLogin"
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  value={userName}
                  onChange={this.onChangeUsername}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="inputlabel">
                PASSWORD
              </label>
              <br />
              <div className="loginInputContainer">
                <input
                  className="inputLogin"
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={passWord}
                  onChange={this.onChangePassword}
                />
              </div>
            </div>

            {/* Submit Button + Error Message */}
            <div>
              <button
                type="button"
                className="autoFillBtn"
                onClick={this.autoFillCredentials}
              >
                Autofill Credentials
              </button>
              <button type="submit" className="loginBtn">
                Login
              </button>
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
