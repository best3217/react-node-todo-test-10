import axios from "axios"

export const addTodo = async (params) => {
  try {
    return await axios.post(`${process.env.REACT_APP_API_URL}/`, params)
  } catch (error) {
    console.log("error", error)
    return {
      errorCode: error.code,
      errorMessage: error.message,
    }
  }
}

export const getTodos = async (activeTab) => {
  try {
    return await axios.get(`${process.env.REACT_APP_API_URL}/${activeTab}`)
  } catch (error) {
    return {
      errorCode: error.code,
      errorMessage: error.message,
    }
  }
}

export const updateTodo = async (params) => {
  try {
    return await axios.patch(`${process.env.REACT_APP_API_URL}/status`, params)
  } catch (error) {
    return {
      errorCode: error.code,
      errorMessage: error.message,
    }
  }
}

export const deleteTodo = async (id) => {
  try {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`)
  } catch (error) {
    return {
      errorCode: error.code,
      errorMessage: error.message,
    }
  }
}

export const deleteCompletedTodos = async (type) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/clear-completed`,
      { type }
    )
  } catch (error) {
    return {
      errorCode: error.code,
      errorMessage: error.message,
    }
  }
}
