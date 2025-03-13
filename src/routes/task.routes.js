const express = require('express');
const router = express.Router();
const { addTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');
const auth = require('../middleware/auth');

router.post('/add', auth, addTask);
router.get('/get', auth, getTasks);
router.patch('/update/:id', auth, updateTask);
router.delete('/delete/:id', auth, deleteTask);

module.exports = router;