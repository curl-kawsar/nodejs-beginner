const Category = require('../models/Category');

const createCategory = async (req, res) => {
    try {
        const category = new Category({
            ...req.body,
            user: req.user._id
        });
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).json({ message: 'Error adding category', error: error.message });
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user._id });
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(400).json({ message: 'Error updating category', error: error.message });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).send({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
}


module.exports = { createCategory, getCategories, updateCategory, deleteCategory };