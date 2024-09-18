# School ERP Backend API

## Overview
This is a Node.js backend API for a school ERP system, built using Express.js, MongoDB, and JWT-based authentication. The API allows teachers to manage student data and assignments, while students can view and submit assignments.

## Live Demo
You can view and demo the app at: [SchoolERP](https://schoolerp-022g.onrender.com)

## Development
1. Clone the repository: `git clone https://github.com/bhaveshpatil07/SchoolERP`
2. Install dependencies: `npm install`
3. Create `.env` file: Add the following variables: `MONGODB_URI`, `JWT_SECRET`, `BACKEND_URL`, `PORT`
4. Start the server: `nodemon index.js`
5. Access the API at: `http://localhost:`{PORT}`/api/v1`
6. Open Swagger UI: `http://localhost:`{PORT}`/api-docs`

## Flow of the application:
_Teacher will_
1. Signup Teacher
2. Login Teacher
3. Create Student
4. Create Assignment

_Student will_
1. Login Student (Username=password : `class_section_rollNumber` LOWER case)
2. Update Password
3. View New Assignments
4. Submit Assignment (Valid URL of your work)

_Teacher will_
1. View Student Submissions
2. Grade Submissions

## Requirements
* Node.js (>= 14.17.0)
* MongoDB (>= 4.4.3)
* npm (>= 6.14.13)


## Dependencies
* express: ^4.17.1
* mongodb: ^3.6.4
* bcryptjs: ^2.4.3
* cors: ^2.8.5
* jsonwebtoken: ^8.5.1
* nodemon: ^2.0.7
* swagger-ui-express: ^4.1.0
* swagger-jsdoc: ^6.1.0

## API Documentation
API documentation is available at: [Swagger UI](https://schoolerp-022g.onrender.com/api-docs)

## Contributing
Contributions are welcome! 
Please submit a pull request with a clear description of the changes.

**If you find this project useful, please consider giving it a ⭐️! It motivates me to continue building and improving this project! 😊**