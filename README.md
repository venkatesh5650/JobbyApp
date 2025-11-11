
### 💼 Jobby App
 

🚀 A responsive job portal web application where users can explore job listings, apply filters, and view detailed job descriptions. Built with modern frontend technologies to provide a smooth user experience.


✨ Features

🔐 Authentication – Secure login & logout flow.

📋 Job Listings – Browse jobs with title, rating, package, description, and company details.

🎯 Filters – Search jobs by type (Full-time, Part-time, Internship, Freelance), salary range, and keyword.

📱 Responsive UI – Works seamlessly across devices.

⚡ Protected Routes – Only authenticated users can access jobs.

🖼 Dynamic Job Details – Click a job to view full description, skills required, and similar jobs.



🛠 Tech Stack

Frontend: React JS, React Router, JSX

Styling: CSS, Flexbox, Responsive Design

State Management: React Hooks (useState, useEffect, useContext)

Authentication: JWT Token (simulated backend auth)

API Handling: Fetch API / REST APIs

## 📂 Project Structure

```
Jobby-App/
│── public/
│ ├── index.html
│ └── favicon.ico
│
│── src/
│ ├── components/
│ │ ├── LoginForm/
│ │ │ └── index.js
│ │ ├── Header/
│ │ │ └── index.js
│ │ ├── JobCard/
│ │ │ └── index.js
│ │ ├── JobDetails/
│ │ │ └── index.js
│ │ └── NotFound/
│ │ └── index.js
│ │
│ ├── App.js
│ ├── index.js
│ └── App.css
│
├── package.json
├── README.md
└── .gitignore
```

🔗 API Documentation

The app fetches job data from a backend API (simulated). Below are the main endpoints:

1️⃣ User Authentication

POST /login/

Request: { "username": "rahul", "password": "rahul@2021" }

Response: { "jwt_token": "eyJhbGciOiJIUzI1NiIs..." }

2️⃣ Get All Jobs

GET /jobs?employment_type=FULLTIME&minimum_package=2000000&search=developer

Response:
```
{
  "jobs": [
    {
      "id": "1",
      "title": "Frontend Developer",
      "company_logo_url": "https://...",
      "location": "Bangalore",
      "employment_type": "Full Time",
      "package_per_annum": "20 LPA",
      "job_description": "Work with React and modern UI..."
    }
  ]
}
```
3️⃣ Get Job Details by ID

GET /jobs/:id/

Response includes: job info, skills, company details, and similar jobs.

▶️ How to Run Locally

Clone the repo

git clone https://github.com/your-username/jobby-app.git
cd jobby-app


Install dependencies

npm install


Start the development server

npm start


Open in browser

http://localhost:3000

📷 Screenshots

🔐 Login Page
<img width="1144" height="557" alt="Screenshot 2025-08-29 111602" src="https://github.com/user-attachments/assets/785527e8-bb7b-4c28-9fd3-1c310ce5470c" />


📋 Job Listings

<img width="1336" height="587" alt="Screenshot 2025-08-29 111654" src="https://github.com/user-attachments/assets/393be0cc-9e22-4ac0-b109-d24e1681c913" />


🌟 What I Learned

Implementing authentication using JWT tokens

Protecting routes with React Router

Designing a responsive layout using Flexbox & media queries

Handling API calls and state management in React

Writing clean, reusable components

🙌 Acknowledgements

🙌 Acknowledgements

This project is inspired by real-world business workflow requirements and built with clean and modular code practices.

