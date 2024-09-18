import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SchoolERP API',
      // description: '1. Assignment Routes: CRUD for Assignments. \n2. Common Routes: Any User can Access. \n3. Teacher Only Ruotes: Only Teacher can access. \n4. Student Routes: CRUD on Students. \n5. Submission Route: CRUD on Submissions \n6. Student Only Routes: Only Student can access them. \n7. User Routes: Login/Signup',
      description: "School ERP API: Using NodeJs, MongoDb by bhaveshpatil07.",
      contact: {
        email: "bhaveshpatil3498@gmail.com",
        url: "https://github.com/bhaveshpatil07"
      },
      version: '1.0.0',
    },
    components: {
      schemas: {
        Student: {
          type: 'object',
          properties: {
            userName: {
              type: 'string',
              description: 'Unique username of the student, references the User model.',
              required: true,
            },
            name: {
              type: 'string',
              description: 'Name of the student.',
              required: true,
            },
            rollNumber: {
              type: 'string',
              description: 'Roll number assigned to the student.',
              required: true,
            },
            class: {
              type: 'string',
              enum: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
              description: 'Class in which the student is enrolled.',
              required: true,
            },
            section: {
              type: 'string',
              enum: ['A', 'B', 'C', 'D', 'E', 'F'],
              description: 'Section assigned to the student.',
              required: true,
            },
          },
          required: ['userName', 'name', 'rollNumber', 'class', 'section'], 
        },
        Assignment: {
          type: 'object',
          properties: {
            teacherId: {
              type: 'string',
              description: 'ID of the teacher assigned to this assignment.',
              required: true,
            },
            title: {
              type: 'string',
              minLength: 3,
              description: 'Title of the assignment.',
              required: true,
            },
            description: {
              type: 'string',
              minLength: 10,
              description: 'Detailed description of the assignment.',
              required: true,
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              description: 'Due date for the assignment.',
              required: true,
            },
            status: {
              type: 'string',
              enum: ['Pending', 'Completed'],
              default: 'Pending',
              description: 'Current status of the assignment.',
              required: true,
            },
          },
          required: ['teacherId', 'title', 'description', 'dueDate', 'status'],
        },
        Submission: {
          type: 'object',
          properties: {
            assignmentId: {
              type: 'string',
              description: 'ID of the assignment being submitted.',
              required: true,
            },
            studentId: {
              type: 'string',
              description: 'ID of the student submitting the assignment.',
              required: true,
            },
            submissionLink: {
              type: 'string',
              description: 'Valid Link to the submitted assignment.',
              required: true,
            },
            grade: {
              type: 'string',
              enum: ['A', 'B', 'C', 'D', 'E', null],
              default: null,
              description: 'Grade assigned to the submission.',
            },
          },
          required: ['assignmentId', 'studentId', 'submissionLink'],
        },
        User: {
          type: 'object',
          properties: {
            userName: {
              type: 'string',
              minLength: 3,
              unique: true, 
              description: 'Unique username of the user, must be at least 3 characters long.',
            },
            password: {
              type: 'string',
              description: 'Hashed password for the user account.',
              minLength: 6,
              required: true,
            },
            role: {
              type: 'string',
              enum: ['Teacher', 'Student'],
              default: 'Student',
              description: 'Role of the user, either Teacher or Student.',
              required: true,
            },
          },
          required: ['userName', 'password', 'role'], 
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme.',
        },
      },
    },
    servers: [
      {
        url: `${process.env.BACKEND_URL || "http://localhost:8000"}/api/v1`
      },
      {
        url: `http://localhost:${process.env.PORT || 8000}/api/v1`,
      },
    ],
    tags: [
      { name: "Teacher Only Routes", description: "Only Teacher accessible endpoints" },
      { name: "Student Only Routes", description: "Only Student accessible endpoints" },
      { name: "Common Routes", description: "Common accessible endpoints" },
      { name: 'User Routes', description: 'User-related endpoints' },
      { name: 'Student Routes', description: 'Student-related endpoints' },
      { name: 'Assignment Routes', description: 'Assignment-related endpoints' },
      { name: 'Submission Routes', description: 'Submission-related endpoints' },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;