import axios from "axios";

const BASE_URL = "http://localhost:5000"; // change if your server runs on a different port

export const getTasks = () => axios.get(`${BASE_URL}/tasks`);
export const addTask = (task) => axios.post(`${BASE_URL}/tasks`, task);
export const deleteTask = (id) => axios.delete(`${BASE_URL}/tasks/${id}`);
export const updateTask = (id, task) => axios.put(`${BASE_URL}/tasks/${id}`, task);
