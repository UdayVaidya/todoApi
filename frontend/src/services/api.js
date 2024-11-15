import axios from 'axios';

const API_BASE_URL = 'https://todoapi-ubw7.onrender.com'; // Replace with your backend URL.

export const getTodos = async () => await axios.get(API_BASE_URL);
export const getTodoById = async (id) => await axios.get(`${API_BASE_URL}/${id}`);
export const createTodo = async (data) => await axios.post(API_BASE_URL, data);
export const updateTodo = async (id, data) => await axios.put(`${API_BASE_URL}/${id}`, data);
export const deleteTodo = async (id) => await axios.delete(`${API_BASE_URL}/${id}`);
