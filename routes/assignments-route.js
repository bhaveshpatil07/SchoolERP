import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";
import { createAssignment, deleteAssignment, getAllAssignments, getNewAssignments, getOldAssignments, updateAssignment } from "../controllers/assignments-controller.js";

const assignmentsRoute = Router();
assignmentsRoute.use(authenticateToken);

assignmentsRoute.get("/", getAllAssignments);
assignmentsRoute.get("/new", getNewAssignments);
assignmentsRoute.get("/old", getOldAssignments);

assignmentsRoute.use(authorizeRole(['Teacher']));
assignmentsRoute.post("/", createAssignment);
assignmentsRoute.put("/:id", updateAssignment);
assignmentsRoute.delete("/:id", deleteAssignment);

/**
 * @swagger
 * /assignment:
 *   get:
 *     summary: Get all assignments
 *     description: Retrieves a list of all assignments
 *     tags: [ Assignment Routes, Common Routes ]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: Assignments not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignments not found"
*   post:
 *     summary: Create a new assignment
 *     description: Creates a new assignment with the provided title, description, and due date. Only teachers can access this route.
 *     tags: [ Assignment Routes, Teacher Only Routes ]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Assignment 1"
 *               description:
 *                 type: string
 *                 example: "This is a sample assignment"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-16T14:30:00.000Z"
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment created successfully"
 *                 newAssignment:
 *                   $ref: '#/components/schemas/Assignment'
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
 *                   example: "Unauthorized"
 */


/**
 * @swagger
 * /assignment/new:
 *   get:
 *     summary: Get new assignments
 *     description: Retrieves a list of new assignments with due dates in the future
 *     tags: [ Assignment Routes, Common Routes ]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of new assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New Assignments"
 *                 assignments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: New assignments not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New assignments not found"
 */
/**
 * @swagger
 * /assignment/old:
 *   get:
 *     summary: Get old assignments
 *     description: Retrieves a list of old assignments with due dates in the past
 *     tags: [ Assignment Routes, Common Routes ]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of old assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Old Assignments"
 *                 assignments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: Old assignments not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Old assignments not found"
 */

/**
 * @swagger
 * /assignment/{id}:
 *   put:
 *     summary: Update an existing assignment
 *     description: Updates an existing assignment with the provided title, description, and due date. Only teachers who created the assignment can update it.
 *     tags: [ Assignment Routes, Teacher Only Routes ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the assignment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Assignment 1"
 *               description:
 *                 type: string
 *                 example: "This is an updated assignment"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-16T14:30:00.000Z"
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment updated successfully"
 *                 updatedAssignment:
 *                   $ref: '#/components/schemas/Assignment'
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to update this assignment"
*   delete:
 *     summary: Delete an existing assignment
 *     description: Deletes an existing assignment. Only teachers who created the assignment can delete it.
 *     tags: [ Assignment Routes, Teacher Only Routes ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the assignment to delete
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment deleted successfully"
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to delete this assignment"
 */

export default assignmentsRoute;