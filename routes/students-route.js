import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controllers/students-controller.js";

const studentsRoute = Router();

studentsRoute.use(authenticateToken);
studentsRoute.use(authorizeRole(['Teacher']));

studentsRoute.get("/", getStudents);
studentsRoute.get("/:id", getStudent);
studentsRoute.post("/", createStudent);
studentsRoute.put("/:id", updateStudent);
studentsRoute.delete("/:id", deleteStudent);

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get all students
 *     description: Retrieves a list of all students. Only teachers can access this route.
 *     tags: [ Student Routes, Teacher Only Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Students retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       404:
 *         description: Students not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Students not found"
 * 
 *   post:
 *     summary: Create a new student
 *     description: Creates a new student with the provided details
 *     tags: [ Student Routes, Teacher Only Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Student details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the student
 *                 example: Bhavesh Patil
 *               rollNumber:
 *                 type: string
 *                 description: The roll number of the student
 *                 example: "S20"
 *               class:
 *                 type: string
 *                 description: The class of the student (I-XII)
 *                 example: "XII"
 *               section:
 *                 type: string
 *                 description: The section of the student (A-F)
 *                 example: "F"
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student created successfully"
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *                 user:
 *                   type: object
 *                   properties:
 *                     userName:
 *                       type: string
 *                     password:
 *                       type: string
 *                     role:
 *                       type: string
 *                       enum: ['Student']
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required and must be non-empty"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only teachers can access this route"
 */

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: Get a student by ID
 *     description: Retrieves a student by ID
 *     tags: [ Student Routes, Teacher Only Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Id is required"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only teachers can access this route"
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student not found"
 *   put:
 *     summary: Update a student
 *     description: Updates a student with the provided details
 *     tags: [ Student Routes, Teacher Only Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Student details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the student
 *                 example: Updated Bhavesh
 *               rollNumber:
 *                 type: string
 *                 description: The new roll number of the student
 *                 example: "M22"
 *               class:
 *                 type: string
 *                 description: The new class of the student (I-XII)
 *                 example: "XI"
 *               section:
 *                 type: string
 *                 description: The new section of the student (A-F)
 *                 example: "C"
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student updated successfully"
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student Id is required"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only teachers can access this route"
 *   delete:
 *     summary: Delete a student
 *     description: Deletes a student with the provided ID
 *     tags: [ Student Routes, Teacher Only Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student deleted successfully"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student Id is required"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only teachers can access this route"
 */
export default studentsRoute;
