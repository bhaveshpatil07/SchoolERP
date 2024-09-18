import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";
import { createSubmission, getMySubmissions, getSubmissionByStudent, getSubmissionsByAssignment, gradeSubmission } from "../controllers/submissions-controller.js";

const submissionsRoute = Router();

submissionsRoute.use(authenticateToken);

submissionsRoute.get("/mine", authorizeRole(['Student']), getMySubmissions);
submissionsRoute.post("/", authorizeRole(['Student']), createSubmission);

submissionsRoute.get("/assignment/:id", authorizeRole(['Teacher']), getSubmissionsByAssignment);
submissionsRoute.get("/student/:userId", authorizeRole(['Teacher']), getSubmissionByStudent);
submissionsRoute.patch("/:id/grade", authorizeRole(['Teacher']), gradeSubmission);


/**
 * @swagger
 * /submission/mine:
 *   get:
 *     summary: Get my submissions
 *     description: Retrieves a list of submissions made by the current student.
 *     tags: [ Submission Routes, Student Only Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "My Submissions"
 *                 submissions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Submission'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Submissions not found"
 */
/**
 * @swagger
 * /submission:
 *   post:
 *     summary: Create a new submission
 *     description: Creates a new submission for an assignment. Only Students can create submissions.
 *     tags: [ Submission Routes, Student Only Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Submission details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assignmentId
 *               - submissionLink
 *             properties:
 *               assignmentId:
 *                 type: string
 *                 description: The ID of the assignment
 *               submissionLink:
 *                 type: string
 *                 description: The link to the submission
 *     responses:
 *       201:
 *         description: Submission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment submitted successfully"
 *                 newSubmission:
 *                   $ref: '#/components/schemas/Submission'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment Due Date has passed"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment not found"
 */

/**
 * @swagger
 * /submission/assignment/{id}:
 *   get:
 *     summary: Get submissions by assignment ID
 *     description: Retrieves a list of submissions for a specific assignment. Only Teachers can retrieve submissions.
 *     tags: [ Submission Routes, Teacher Only Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the assignment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submissions for assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Submissions for AssignmentID: {id}"
 *                 submissions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Submission'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment Id is required"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No submissions found"
 */

/**
 * @swagger
 * /submission/{id}/grade:
 *   patch:
 *     summary: Grade a submission
 *     description: Grades a submission with a specific grade. Only Teachers can grade submissions for their assignments.
 *     tags: [ Submission Routes, Teacher Only Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the submission
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Grade details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: string
 *                 enum: [A, B, C, D, E]
 *                 description: The grade to assign to the submission
 *     responses:
 *       200:
 *         description: Submission graded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Submission graded successfully"
 *                 submission:
 *                   $ref: '#/components/schemas/Submission'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid grade. Must be one of: A, B, C, D, E"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized to grade this submission"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Submission not found"
 */

/**
 * @swagger
 * /submission/student/{userId}:
 *   get:
 *     summary: Get submissions by student ID
 *     description: Retrieves a list of submissions for a specific student.
 *     tags: [Submission Routes, Teacher Only Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submissions for student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Submissions for StudentID: {userId}"
 *                 submissions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Submission'
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
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No submissions found"
 */

export default submissionsRoute;