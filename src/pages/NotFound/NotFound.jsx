// NotFound Component — clean, minimal, ATS-friendly comments

import './index.css'

// Renders a simple fallback UI when the user navigates to an invalid route
const NotFound = () => (
  <div className="notFoundContainer">
    {/* Illustrative not-found image */}
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notFoundImg"
    />

    {/* Heading for the error state */}
    <h1 className="notFoundHead">Page Not Found</h1>

    {/* Supporting message for the user */}
    <p className="notFoundMSG">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound;