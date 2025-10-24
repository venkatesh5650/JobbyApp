import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosSearch} from 'react-icons/io'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const locationsList = [
  {locationId: 1, locationType: 'Hyderabad'},
  {locationId: 2, locationType: 'Bangalore'},
  {locationId: 3, locationType: 'Chennai'},
  {locationId: 4, locationType: 'Delhi'},
  {locationId: 5, locationType: 'Mumbai'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    status: apiStatusConstants.initial,
    jobDetailsStatus: apiStatusConstants.initial,
    jobDetailsList: [],
    filteredJobDetails: [],
    searchInput: '',
    title: '',
    empType: [],
    salRange: '',
    locationType: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  // ===================== Search =====================
  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    this.setState({title: searchInput, searchInput: ''}, this.getJobsDetails)
  }

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.onClickSearch()
    }
  }

  // ===================== Filters =====================
  onClickEmpType = label => {
    this.setState(prevState => {
      const {empType} = prevState
      const updatedEmpType = empType.includes(label)
        ? empType.filter(type => type !== label)
        : [...empType, label]
      return {empType: updatedEmpType}
    }, this.getJobsDetails)
  }

  onClickSalRange = range => {
    this.setState({salRange: range}, this.getJobsDetails)
  }

  onClickLocationType = loctype => {
    this.setState(prevState => {
      const {locationType} = prevState
      const updatedLocType = locationType.includes(loctype)
        ? locationType.filter(type => type !== loctype)
        : [...locationType, loctype]
      return {locationType: updatedLocType}
    }, this.applyLocationFilter)
  }

  // ===================== Location Filter Local =====================
  applyLocationFilter = () => {
    const {jobDetailsList, locationType} = this.state
    if (locationType.length === 0) {
      this.setState({filteredJobDetails: jobDetailsList})
      return
    }
    const filtered = jobDetailsList.filter(job =>
      locationType.includes(job.location),
    )
    this.setState({filteredJobDetails: filtered})
  }

  // ===================== API Calls =====================
  getProfileDetails = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profile = data.profile_details
      const updatedData = {
        name: profile.name,
        profileImgUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  getJobsDetails = async () => {
    this.setState({jobDetailsStatus: apiStatusConstants.inProgress})
    const {title, empType, salRange} = this.state
    const multiEmpType = empType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${title}&employment_type=${multiEmpType}&minimum_package=${salRange}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState(
        {
          jobDetailsList: updatedData,
          filteredJobDetails: updatedData,
          jobDetailsStatus: apiStatusConstants.success,
        },
        this.applyLocationFilter,
      )
    } else {
      this.setState({jobDetailsStatus: apiStatusConstants.failure})
    }
  }

  // ===================== Profile Section =====================
  getProfileCard = () => {
    const {profileDetails} = this.state
    const {name, profileImgUrl, shortBio} = profileDetails
    return (
      <div className="profileCard">
        <img src={profileImgUrl} alt="profile" className="profileImg" />
        <h1 className="profile">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  getProfileFailureView = () => (
    <div className="profileFailure">
      <button
        className="retryBtn"
        type="button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  getLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#6366f1" height="50" width="50" />
    </div>
  )

  renderProfileSection = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.getProfileCard()
      case apiStatusConstants.failure:
        return this.getProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.getLoader()
      default:
        return null
    }
  }

  // ===================== Jobs Section =====================
  getJobsFetchFailure = () => (
    <div className="jobFailureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobFailureImg"
        alt="failure view"
      />
      <h1 className="jobFailhead">Oops! Something Went Wrong</h1>
      <p className="jobfailContent">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retryBtn" type="button" onClick={this.getJobsDetails}>
        Retry
      </button>
    </div>
  )

  getNoJobsFound = () => (
    <div className="jobFailureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="jobFailureImg"
        alt="no jobs"
      />
      <h1 className="jobFailhead">No Jobs Found</h1>
      <p className="jobfailContent">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  getJobSearchResults = () => {
    const {filteredJobDetails} = this.state
    return (
      <div className="jobdetailsContainer">
        {filteredJobDetails.length === 0
          ? this.getNoJobsFound()
          : this.getAllJobsDetails()}
      </div>
    )
  }

  getAllJobsDetails = () => {
    const {filteredJobDetails, searchInput} = this.state
    return (
      <div>
        <div className="inputContainer2">
          <input
            type="search"
            placeholder="Search"
            className="input"
            onChange={this.onChangeSearch}
            onKeyDown={this.handleKeyDown}
            value={searchInput}
          />

          <div className="iconContainer">
            <button
              type="button"
              className="SearchIconBtn"
              onClick={this.onClickSearch}
              data-testid="searchButton"
            >
              <IoIosSearch className="SearchIcon" />
            </button>
          </div>
        </div>
        <ul className="allJobsContainer">
          {filteredJobDetails.map(eachJobDetails => (
            <JobItem
              key={eachJobDetails.id}
              singleJobDetails={eachJobDetails}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobsSection = () => {
    const {jobDetailsStatus} = this.state
    switch (jobDetailsStatus) {
      case apiStatusConstants.success:
        return this.getJobSearchResults()
      case apiStatusConstants.failure:
        return this.getJobsFetchFailure()
      case apiStatusConstants.inProgress:
        return this.getLoader()
      default:
        return null
    }
  }

  render() {
    const {searchInput, empType, locationType, salRange} = this.state
    return (
      <div className="bgJobsContainer">
        <Header />
        <div className="jobsContainer">
          <div className="topSection">
            {/* Search bar */}
            <div className="inputContainer">
              <input
                type="search"
                placeholder="Search"
                className="input"
                onChange={this.onChangeSearch}
                value={searchInput}
              />
              <div className="iconContainer">
                <button
                  type="button"
                  className="SearchIconBtn"
                  onClick={this.onClickSearch}
                  data-testid="searchButton"
                >
                  <IoIosSearch className="SearchIcon" />
                </button>
              </div>
            </div>

            {/* Profile */}
            <div>{this.renderProfileSection()}</div>

            <hr className="horlines" />

            {/* Employment Type Filter */}
            <div className="empTypeCategory">
              <h1 className="typeHead">Type of Employment</h1>
              <ul className="listContainer">
                {employmentTypesList.map(eachItem => (
                  <li className="typeContainer" key={eachItem.employmentTypeId}>
                    <label className="label">
                      <input
                        type="checkbox"
                        className="checkInput"
                        onChange={() =>
                          this.onClickEmpType(eachItem.employmentTypeId)
                        }
                        checked={empType.includes(eachItem.employmentTypeId)}
                      />
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="horline" />

            {/* Location Filter */}
            <div className="empTypeCategory">
              <h1 className="typeHead">Type of Location</h1>
              <ul className="listContainer">
                {locationsList.map(eachItem => (
                  <li className="typeContainer" key={eachItem.locationId}>
                    <label className="label">
                      <input
                        type="checkbox"
                        className="checkInput"
                        onChange={() =>
                          this.onClickLocationType(eachItem.locationType)
                        }
                        checked={locationType.includes(eachItem.locationType)}
                      />
                      {eachItem.locationType}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="horline" />

            {/* Salary Filter */}
            <div className="empTypeCategory">
              <h1 className="typeHead">Salary Range</h1>
              <ul className="listContainer">
                {salaryRangesList.map(eachItem => (
                  <li className="typeContainer" key={eachItem.salaryRangeId}>
                    <label className="label">
                      <input
                        type="radio"
                        name="salary"
                        className="checkInput"
                        onChange={() =>
                          this.onClickSalRange(eachItem.salaryRangeId)
                        }
                        checked={salRange === eachItem.salaryRangeId}
                      />
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Jobs List */}
          <div className="bottomSection">{this.renderJobsSection()}</div>
        </div>
      </div>
    )
  }
}

export default Jobs
