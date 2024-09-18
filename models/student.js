import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        unique: true,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    class: {
        type: String,
        enum: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
        required: true
    },
    section: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E', 'F'],
        required: true
    },
});

export default mongoose.model("Student", studentSchema);
