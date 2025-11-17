import Cookies from 'js-cookie'

const BASE_URL = 'https://apis.ccbp.in'

/* ========================= PROFILE API ========================= */

export const fetchProfile = async () => {
  const jwtToken = Cookies.get('jwt_token')

  const response = await fetch(`${BASE_URL}/profile`, {
    headers: {Authorization: `Bearer ${jwtToken}`},
  })

  return response
}

/* ========================= JOBS LIST API ========================= */

export const fetchJobs = async ({search = '', empType = [], salRange = ''}) => {
  const jwtToken = Cookies.get('jwt_token')
  const empTypes = empType.join(',')

  const url = `${BASE_URL}/jobs?search=${search}&employment_type=${empTypes}&minimum_package=${salRange}`

  const response = await fetch(url, {
    headers: {Authorization: `Bearer ${jwtToken}`},
  })

  return response
}

/* ========================= JOB DETAILS API ========================= */

export const fetchJobDetails = async id => {
  const jwtToken = Cookies.get('jwt_token')

  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    headers: {Authorization: `Bearer ${jwtToken}`},
  })

  return response
}

/* ========================= LOGIN API ========================= */

export const loginUser = async (username, password) => {
  const body = {username, password}

  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return response
}
