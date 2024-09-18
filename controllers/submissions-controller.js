import Submission from "../models/submission.js";
import Assignment from "../models/assignment.js";

export const getSubmissionsByAssignment = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Assignment Id is required" });
    }    
    try {
        const submissions = await Submission.find({ assignmentId: id });
        if(!submissions) {
            return res.status(404).json({ message: "No submissions found" });
        }
        res.status(200).json({ message: "Submissions for AssignmentID: " + id, submissions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSubmissionByStudent = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: "Student Id is required" });
    }
    try {
        const submissions = await Submission.find({ studentId: userId });
        if(!submissions) {
            return res.status(404).json({ message: "No submissions found" });
        }
        res.status(200).json({ message: "Submissions for StudentID: " + userId, submissions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMySubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ studentId: req.user.userId });
        if(!submissions) {
            return res.status(404).json({ message: "No submissions found" });
        }
        res.status(200).json({ message: "My Submissions", submissions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSubmission = async (req, res) => {
    const { assignmentId, submissionLink } = req.body;

    if (!assignmentId || !submissionLink || assignmentId.trim() === "" || submissionLink.trim() === "") {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const url = new URL(submissionLink);
        if (!url.protocol || !url.host) {
            return res.status(400).json({ message: "Invalid submission link" });
        }
    } catch (error) {
        return res.status(400).json({ message: "Invalid submission link" });
    }

    try {
        const ass = await Assignment.findById(assignmentId);
        if (!ass) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        if(ass.dueDate < new Date()) {
            return res.status(401).json({ message: "Assignment Due Date has passed" });
        }

        const earlierSubmission = await Submission.findOne({ studentId: req.user.userId, assignmentId });
        if (earlierSubmission) {
            return res.status(400).json({ message: "You have already submitted this assignment" });
        }

        const newSubmission = new Submission({
            assignmentId,
            submissionLink,
            studentId: req.user.userId,
        });

        await newSubmission.save();
        res.status(201).json({ message: "Assignment submitted successfully", newSubmission });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const gradeSubmission = async (req, res) => {
    const { id } = req.params;
    const { grade } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Submission Id is required" });  
    }
    const options = ['A', 'B', 'C', 'D', 'E'];

    if ( !grade || !options.includes(grade) || grade.trim() === "") {
        return res.status(400).json({ message: "Invalid grade. Must be one of: A, B, C, D, E" });
    }

    try {
        const submission = await Submission.findById(id).populate('assignmentId');
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        if (submission.assignmentId.teacherId.toString() !== req.user.userId.toString()) {
            return res.status(401).json({ message: "Unauthorized to grade this submission" });
        }

        if (submission.grade && submission.assignmentId.dueDate < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) {
            return res.status(400).json({ message: "Cannot update grade after 7 days of due date" });
        }

        submission.grade = grade;
        await submission.save();
        res.status(200).json({ message: "Submission graded successfully", submission });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

