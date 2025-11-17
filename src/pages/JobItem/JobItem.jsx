import {Link} from 'react-router-dom'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import './index.css'

/**
 * Single Job Item Component
 * - Receives one job object via props
 * - Displays key job details (logo, title, rating, location, salary)
 * - Wraps entire card with a Link → navigates to detailed job view
 */
const JobItem = props => {
  const {singleJobDetails} = props
  const {
    companyLogoUrl,
    rating,
    title,
    location,
    packagePerAnnum,
    employmentType,
    jobDescription,
    id,
  } = singleJobDetails

  return (
    // Clicking anywhere on the card navigates to detailed job page
    <Link to={`/jobs/${id}`} className="link-text">
      <div className="singleJobContainer">
        
        {/* Company logo + job title + rating */}
        <div className="logosContainer">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-logo"
          />
          <div>
            <h1 className="jobTitleNew">{title}</h1>
            <div className="ratingContainer">
              <FaStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        {/* Location, Employment Type & Salary */}
        <div className="locationSalaryContainer">
          <div className="locContainer">
            <div className="singleLoc">
              <IoLocationSharp className="locationLogo" />
              <p className="empType">{location}</p>
            </div>
            <div className="singleLoc">
              <BsBriefcase className="locationLogo" />
              <p className="empType">{employmentType}</p>
            </div>
          </div>

          <p className="packagePerAnnum">{packagePerAnnum}</p>
        </div>

        {/* Short job description */}
        <hr className="horlineNEWXs" />
        <h1 className="descriptures">Description</h1>
        <p className="jobDescriptions">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobItem
