import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    title: {
        type: String,
        minLength: 3,
        required: true
    },
    description: {
        type: String,
        minLength: 10,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
        required: true
    }
});

export default mongoose.model('Assignment', assignmentSchema);