import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = () => axios.get(API_URL);
export const getTaskCount = () => axios.get(`${API_URL}/count`);

export const createTask = (task) => axios.post(API_URL, task);
