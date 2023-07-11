const express = require('express');
const router = express.Router();
const {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  deleteCompletedTodos,
} = require('../controllers');

router.get('/:type', getTodos);
router.patch('/status', updateTodo);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.post('/clear-completed', deleteCompletedTodos);

module.exports = router;
