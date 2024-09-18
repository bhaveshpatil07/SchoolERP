import Student from "../models/student.js";
import User from "../models/user.js";
import bcrypt from 'bcryptjs';

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const getStudent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        const student = await Student.findById(id);
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createStudent = async (req, res) => {
    const { name, rollNumber, class: className, section } = req.body;
    if (!name || !rollNumber || !className || !section || !name.trim() || !rollNumber.trim() || !className.trim() || !section.trim()) {
        return res.status(400).json({ message: "All fields are required and must be non-empty" });
    }
    const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    if (!classes.includes(className)) {
        return res.status(400).json({ message: "Invalid class" });
    }

    const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
    if (!sections.includes(section)) {
        return res.status(400).json({ message: "Invalid section" });
    }

    try {
        const newUser = new User({
            userName: `${className}_${section}_${rollNumber}`.toLowerCase(),
            password: `${className}_${section}_${rollNumber}`.toLowerCase(),
            role: 'Student'
        });

        const user = await newUser.save();
        if(!user) {
            return res.status(400).json({ message: "User not created" });
        }

        const newStudent = new Student({
            userName: user._id,
            name,
            rollNumber,
            class: className,
            section
        });
        const student = await newStudent.save();
        if(!student) {
            return res.status(400).json({ message: "Student not created" });
        }
        res.status(201).json({ message: "Student created successfully", student, user });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Student Id is required" });
    }
    const { name, rollNumber, class: className, section } = req.body;
    let flag = false;
    const query = { _id: id };
    if(name && name.trim()) {
        query.name = name;
    }
    if(rollNumber && rollNumber.trim()) {
        query.rollNumber = rollNumber;
        flag = true;
    }
    if(className && className.trim()) {
        query.class = className;
        flag = true;
    }
    if(section && section.trim()) {
        query.section = section;
        flag = true;
    }
    if(!query.name && !query.rollNumber && !query.class && !query.section) {
        return res.status(400).json({ message: "Nothing to update" });
    }

    try {
        const student = await Student.findByIdAndUpdate(id, query, { new: true });
        if(!student) {
            return res.status(400).json({ message: "Student not found" });
        }
        if(flag) {
            const hash = bcrypt.hashSync(`${student.class}_${student.section}_${student.rollNumber}`.toLowerCase(), 10);
            const user = await User.findByIdAndUpdate(student.userName, { userName: `${student.class}_${student.section}_${student.rollNumber}`.toLowerCase(), password: hash }, { new: true });
            if(!user) {
                return res.status(400).json({ message: "User not found for this student" });
            }
        }
        res.status(200).json({ message: "Student updated successfully", student });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Student Id is required" });
    }
    try {
        const student = await Student.findByIdAndDelete(id);
        if(!student) {
            return res.status(400).json({ message: "Student not found" });
        }
        const user = await User.findByIdAndDelete(student.userName);
        if(!user) {
            return res.status(400).json({ message: "User not found for this student" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}