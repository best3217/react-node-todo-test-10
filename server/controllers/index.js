const { Lists } = require('../database/models');

const addTodo = async (req, res) => {
  const { note, status, type } = req.body;
  if (!note) {
    return res.json({ status: 'Error', field: 'title' });
  }
  try {
    const result = await Lists.create({
      note,
      status,
      type,
    });
    return res.json({ status: 'OK', result });
  } catch (error) {
    return res.json({
      status: 'Error',
      code: error.code,
      message: error.message,
    });
  }
};

const getTodos = async (req, res) => {
  const { type } = req.params;
  try {
    const result = await Lists.findAll({
      where: {
        type: type * 1,
      },
      order: [['createdAt', 'DESC']],
    });
    return res.json({ status: 'OK', result });
  } catch (error) {
    return res.json({
      status: 'Error',
      code: error.code,
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  const { status, id } = req.body;
  console.log('params', status, id);
  try {
    const result = await Lists.update(
      { status: status },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({ status: 'OK', result });
  } catch (error) {
    return res.json({
      status: 'Error',
      code: error.code,
      message: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Lists.destroy({
      where: {
        id,
      },
    });
    return res.json({ status: 'OK', result });
  } catch (error) {
    return res.json({
      status: 'Error',
      code: error.code,
      message: error.message,
    });
  }
};

const deleteCompletedTodos = async (req, res) => {
  const { type } = req.body;
  try {
    const result = await Lists.destroy({
      where: {
        status: 1,
        type,
      },
    });
    return res.json({ status: 'OK', result });
  } catch (error) {
    return res.json({
      status: 'Error',
      code: error.code,
      message: error.message,
    });
  }
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  deleteCompletedTodos,
};
