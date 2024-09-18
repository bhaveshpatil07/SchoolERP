import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";
import { login, signup, updatePassword } from "../controllers/users-controller.js";

const usersRoute = Router();

usersRoute.post("/signup", signup);
usersRoute.post("/login", login);

usersRoute.use(authenticateToken);
usersRoute.patch("/changepassword", updatePassword);


/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user (Teacher Only)
 *     description: Creates a new user with the provided username and password
 *     tags: [ User Routes, Teacher Only Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *               - confirmPassword
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The username of the new user
 *                 example: teacher101
 *               password:
 *                 type: string
 *                 description: The password of the new user
 *                 example: Password@123
 *               confirmPassword:
 *                 type: string
 *                 description: The confirmation of the password
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum:
 *                     - "All fields are required"
 *                     - "Username must start with a letter and can only contain lowercase letters and numbers"
 *                     - "Password does not match with confirm password"
 *                     - "Password does not meet the requirements: Atleast 1 UPPER case, 1 lower CASE, 1 special char, 1 num and length 8-15"
 *                     - "User not created"
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists for userName: teacher101"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user (Teacher/Student)
 *     description: Authenticates a user with the provided username and password and returns a JWT token.
 *     tags: [ User Routes, Common Routes ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The username of the user
 *                 example: teacher101
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   description: The JWT token for the user
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum:
 *                     - "All fields are required"
 *                     - "User not found"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /user/changepassword:
 *   patch:
 *     summary: Update user password
 *     description: Updates the password of the authenticated user
 *     tags: [ User Routes, Common Routes ]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current password of the user
 *                 example: OldPassword@123
 *               newPassword:
 *                 type: string
 *                 description: The new password of the user
 *                 example: NewPassword@123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum:
 *                     - "Old password and new password are required"
 *                     - "Password does not meet the requirements: Atleast 1 UPPER case, 1 lower CASE, 1 special char, 1 num and length 8-15"
 *       401:
 *         description: Invalid old password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid old password"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
export default usersRoute;
