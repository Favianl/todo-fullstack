import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from '../api/tasks';

const TodoContext = createContext();

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('Context Error');

  return context;
};

export const TodoProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState(null);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const getTasks = async () => {
        try {
          const res = await getTasksRequest();
          setTasks(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getTasks();
    }
  }, [user]);

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (data) => {
    try {
      const res = await createTaskRequest(data);

      setTasks((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, data) => {
    try {
      const res = await updateTaskRequest(id, data);
      if (res.status === 200) {
        setTasks((prev) => {
          const newData = prev.map((task) =>
            task.id === parseInt(id)
              ? { ...task, description: res.data.description }
              : task,
          );
          return newData;
        });
        return res.status;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 200) {
        setTasks((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const values = { getTask, tasks, createTask, updateTask, deleteTask };
  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};
