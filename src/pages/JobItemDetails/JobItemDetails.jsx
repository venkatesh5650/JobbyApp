import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import SimilarJobItem from '../../components/SimilarJobItem/SimilarJobItem'
import Header from '../../components/Header/Header'
import { fetchJobDetails } from "../../api"

import './index.css'

/**
 * Job Item Details Page
 * - Displays the full job description for a selected job
 * - Fetches job details + similar jobs using the job ID from route params
 * - Uses centralized API function fetchJobDetails()
 */
class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobsData: [],
    skills: [],
    lifeAtCompany: {},
    status: 'loading', // loading | success | failure
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  /**
   * Fetches job details from API based on URL param ID.
   * Normalizes API response into clean, predictable objects for UI rendering.
   */
  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetchJobDetails(id)

    if (response.ok === true) {
      const data = await response.json()

      // Transform job details for cleaner UI consumption
      const jobDetails = data.job_details
      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }

      // Transform similar jobs list
      const updatedSimilarJobs = data.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        id: job.id,
        title: job.title,
      }))

      // Transform skills list
      const updatedSkills = jobDetails.skills.map(skill => ({
        name: skill.name,
        imageUrl: skill.image_url,
      }))

      // Life at company data
      const updatedLifeATcompany = {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }

      this.setState({
        jobItemDetails: updatedJobDetails,
        similarJobsData: updatedSimilarJobs,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeATcompany,
        status: 'success',
      })
    } else {
      this.setState({status: 'failure'})
    }
  }

  /**
   * Renders complete job details view once data is loaded.
   */
  getJobDetails = () => {
    const {jobItemDetails, skills, similarJobsData, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
    } = jobItemDetails

    const {imageUrl, description} = lifeAtCompany

    return (
      <div className="jobItemBgContainer">
        <Header />

        <div className="singleJobItemDetails">
          <div className="singleJobContainer">
            
            {/* Logo, Title, and Rating */}
            <div className="logosContainer">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="jobLogo2"
              />
              <div>
                <h1 className="jobTitle2">{title}</h1>
                <div className="ratingContainer">
                  <FaStar className="star2" />
                  <p className="rating2">{rating}</p>
                </div>
              </div>
            </div>

            {/* Location, employment type & CTC */}
            <div className="locationSalaryContainer">
              <div className="locContainer">
                <div className="singleLoc">
                  <IoLocationSharp className="locLogo2" />
                  <p className="details2">{location}</p>
                </div>
                <div className="singleLoc">
                  <BsBriefcase className="locLogo2" />
                  <p className="details2">{employmentType}</p>
                </div>
              </div>
              <p className="package2">{packagePerAnnum}</p>
            </div>

            <hr className="horline2" />

            {/* Job description section */}
            <div className="descriptLink">
              <h1 className="package2">Description</h1>
              <div className="visitLinkContainer">
                <a
                  href={companyWebsiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="linkText"
                >
                  Visit
                </a>
                <FaExternalLinkAlt className="externalLink" />
              </div>
            </div>

            <p className="jobDescription2">{jobDescription}</p>

            {/* Skills & Life at Company */}
            <div className="skillsContainer">
              <h1 className="skillsHead">Skills</h1>
              <ul className="allSkillsContainer">
                {skills.map(skill => (
                  <li className="singleSkillContainer" key={skill.name}>
                    <img src={skill.imageUrl} alt={skill.name} className="skillImg" />
                    <p className="skillText">{skill.name}</p>
                  </li>
                ))}
              </ul>

              <div className="lifeAtCompanyContainer">
                <div>
                  <h1 className="skillsHead">Life at Company</h1>
                  <p className="descriptionCompany">{description}</p>
                </div>
                <img src={imageUrl} alt="life_at_company" className="companyLifeImg" />
              </div>
            </div>
          </div>

          {/* Similar jobs */}
          <div className="similarJobsContainer">
            <h1 className="skillsHead">Similar Jobs</h1>
            <ul className="allSimilarJobsContainer">
              {similarJobsData.map(job => (
                <SimilarJobItem similarJobDetails={job} key={job.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  /** Renders loader until API data arrives */
  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {status} = this.state

    return (
      <div className="renderResultsContainer">
        {status === 'loading' ? this.renderLoader() : this.getJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
