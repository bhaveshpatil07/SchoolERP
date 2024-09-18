import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        minLength: 3,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Teacher', 'Student'],
        default: 'Student',
        required: true
    }
});

userSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
    }
    next();
});

export default mongoose.model('User', userSchema);