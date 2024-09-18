import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

export const signup = async (req, res) => {
    const { userName, password, confirmPassword } = req.body;

    if (!userName || !password || !confirmPassword || !userName.trim() || !password.trim() || !confirmPassword.trim()) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    if (!/^[a-z][a-z0-9]*$/.test(userName)) {
        return res.status(400).json({ message: "Username must start with a letter and can only contain lowercase letters and numbers" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password does not match with confirm password" });
    }

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (!strongPassword.test(password)) {
        return res.status(400).json({ message: "Password does not meet the requirements: Atleast 1 UPPER case, 1 lower CASE, 1 special char, 1 num and length 8-15" });
    }

    try {
        const existingUser = await User.findOne({ userName });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists for userName: " + userName});
        }

        const newUser = new User({ userName, password, role: "Teacher" });

        const savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(400).json({ message: "User not created" });
        }

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password || !userName.trim() || !password.trim()) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {
        return res.status(400).json({ message: "Old password and new password are required" });
    }

    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = bcrypt.compareSync(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid old password" });
        }

        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        if (!strongPassword.test(newPassword)) {
            return res.status(400).json({ message: "Password does not meet the requirements: Atleast 1 UPPER case, 1 lower CASE, 1 special char, 1 num and length 8-15" });
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
