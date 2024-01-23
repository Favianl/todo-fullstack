import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const TaskPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskFound, setTaskFound] = useState(null);

  const navigate = useNavigate();

  const { tasks, getTask, updateTask, deleteTask } = useTodo();

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const task = await getTask(id);
      setTaskFound(task);
    };
    getData();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = () => {
    setIsEditing((prev) => {
      if (!prev) setValue('description', taskFound.description);
      return !prev;
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    const res = await updateTask(id, data);

    if (res === 200) {
      setTaskFound((prev) => ({ ...prev, description: data.description }));
      setIsEditing(false);
    }
  });

  if (!taskFound) return <div>Task not found</div>;

  // if (!tasks) return null;
  //
  // const taskFound = tasks.find((task) => task.id == id);
  //
  // if (!taskFound) return <div>Task not Found</div>;
  //

  const handleDelete = () => {
    const taskId = parseInt(id);
    deleteTask(taskId);
    navigate('/tasks');
  };

  return (
    <div>
      <h2>Task</h2>
      <div>Id: {taskFound.id}</div>
      <div>User Id: {taskFound.user_id}</div>
      <div>Description: {taskFound.description}</div>
      <div>Date of create: {taskFound.created_at}</div>
      <br />
      {isEditing && (
        <form onSubmit={onSubmit}>
          <input
            {...register('description', {
              required: 'description is required',
            })}
            type='text'
            placeholder='description...'
          />
          {errors.description && <p>{errors.description.message}</p>}
          <input type='submit' value='Save' />
        </form>
      )}
      <br />

      <button onClick={handleDelete}>delete</button>
      <button onClick={handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
      <br />
      <Link to='/tasks'>Back</Link>
    </div>
  );
};

export default TaskPage;
