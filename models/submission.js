import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    submissionLink: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E', null],
        default: null
    }
});

export default mongoose.model('Submission', submissionSchema);