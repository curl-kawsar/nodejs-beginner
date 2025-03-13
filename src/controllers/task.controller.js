const Task = require('../models/Task');

const addTask = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            user: req.user._id
        });
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).json({ message: 'Error adding task', error: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
}

module.exports = { addTask, getTasks, updateTask, deleteTask };