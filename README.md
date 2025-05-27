chool Management API
A RESTful API for managing school data with proximity-based sorting functionality built with Node.js, Express.js, and MySQL.

🚀 Live Demo
API Base URL: https://sincere-gratitude-production-1408.up.railway.app

📋 Features
Add new schools with location data

Retrieve schools sorted by proximity to user location

Input validation and error handling

MySQL database integration

CORS and security middleware

Duplicate location prevention

Distance calculation using Haversine formula

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MySQL

Validation: Express-validator

Security: Helmet, CORS

Deployment: Railway

📡 API Endpoints
1. Health Check
GET /health

Checks if the API server is running

Returns success message with timestamp

2. Add School
POST /api/addSchool

Adds a new school to the database

Requires JSON body with name, address, latitude, and longitude

Validates input data

Prevents duplicate schools at the same location

3. List Schools by Proximity
GET /api/listSchools?latitude={latitude}&longitude={longitude}

Retrieves all schools sorted by distance from the given coordinates

Requires latitude and longitude as query parameters

🔧 How to Set Up and Run
Clone the repository

Install dependencies using npm install

Configure environment variables in a .env file

Ensure MySQL database and schools table are set up

Start the server using npm run dev for development or npm start for production

🧪 Testing
Use Postman or cURL to test the endpoints

Add schools with valid data

Retrieve schools sorted by proximity

Test validation and duplicate prevention
![image](https://github.com/user-attachments/assets/e7a852dd-d368-40df-ab85-c2da88c7c5c7)


