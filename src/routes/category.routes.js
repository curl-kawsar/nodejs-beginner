const express = require('express');
const router = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/category.controller');
const auth = require('../middleware/auth');

router.post('/add', auth, createCategory);
router.get('/get', auth, getCategories);
router.patch('/update/:id', auth, updateCategory);
router.delete('/delete/:id', auth, deleteCategory);

module.exports = router;