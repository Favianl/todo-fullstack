import axios from './axios';

export const getTasksRequest = () => axios.get('/tasks');

export const getTaskRequest = (taskId) => axios.get(`/tasks/${taskId}`);

export const createTaskRequest = (data) => axios.post('/tasks', data);

export const updateTaskRequest = (taskId, data) =>
  axios.patch(`/tasks/${taskId}`, data);

export const deleteTaskRequest = (taskId) => axios.delete(`/tasks/${taskId}`);
