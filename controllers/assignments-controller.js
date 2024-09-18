import Assignment from "../models/assignment.js";

export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getNewAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ dueDate: { $gte: new Date() } });
        res.status(200).json({ message: "New Assignments", assignments});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOldAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ dueDate: { $lt: new Date() } });
        res.status(200).json({ message: "Old Assignments", assignments});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createAssignment = async (req, res) => {
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate || title.trim() === "" || description.trim() === "" || dueDate.trim() === "") {
        return res.status(400).json({ message: "All fields are required" });
    }
    const date = new Date(dueDate);
    if(!date) {
        return res.status(400).json({ message: "Invalid date format" });
    }
    if(date < new Date()) {
        return res.status(400).json({ message: "Due date cannot be in the past" });
    }

    try {
        const newAssignment = new Assignment({
            title,
            description,
            dueDate,
            teacherId: req.user.userId
        });
        await newAssignment.save();
        res.status(201).json({ message: "Assignment created successfully", newAssignment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateAssignment = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Assignment Id is required" });
    }

    const { title, description, dueDate } = req.body;
    const query = { _id: id };

    if (title && title.trim()) {
        query.title = title;
    }

    if (description && description.trim()) {
        query.description = description;
    }

    if (dueDate && dueDate.trim()) {
        const date = new Date(dueDate);
        if (!date) {
            return res.status(400).json({ message: "Invalid date format" });
        }
        if (date < new Date()) {
            return res.status(400).json({ message: "Due date cannot be in the past" });
        }
        query.dueDate = date;
    }   

    if (!query.title && !query.description && !query.dueDate) {
        return res.status(400).json({ message: "Nothing to update" });
    }

    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) {
            return res.status(400).json({ message: "Assignment not found" });
        }
        if(assignment.teacherId.toString() !== req.user.userId.toString()) {
            return res.status(400).json({ message: "You are not authorized to update this assignment" });
        }

        const updatedAssignment = await Assignment.findByIdAndUpdate(id, query, { new: true });
        res.status(200).json({ message: "Assignment updated successfully", updatedAssignment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteAssignment = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Assignment Id is required" });
    }

    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) {
            return res.status(400).json({ message: "Assignment not found" });
        }
        if(assignment.teacherId.toString() !== req.user.userId.toString()) {
            return res.status(400).json({ message: "You are not authorized to delete this assignment" });
        }

        await Assignment.findByIdAndDelete(id);
        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
