import axios from "axios";

export const addTodo = async (params) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/`, params);
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return {
      statusCode: error.status,
      data: error.response.data,
    };
  }
};

export const getTodos = async (activeTab) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/${activeTab}`
    );
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return {
      statusCode: error.status,
      data: error.response.data,
    };
  }
};

export const updateTodo = async (params) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/status`,
      params
    );
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return {
      statusCode: error.status,
      data: error.response.data,
    };
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return {
      statusCode: error.status,
      data: error.response.data,
    };
  }
};

export const deleteCompletedTodos = async (type) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/clear-completed`,
      { type }
    );
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return {
      statusCode: error.status,
      data: error.response.data,
    };
  }
};
