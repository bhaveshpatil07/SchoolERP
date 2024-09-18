import { Router } from "express";
import userRouter from "./routes/users-route.js";
import studentRouter from "./routes/students-route.js";
import assignmentRouter from "./routes/assignments-route.js";
import submissionRouter from "./routes/submissions-route.js";

const router = Router();

router.use("/user", userRouter);
router.use("/student", studentRouter);
router.use("/assignment", assignmentRouter);
router.use("/submission", submissionRouter);

export default router;