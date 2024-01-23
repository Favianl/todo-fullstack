import { useForm } from 'react-hook-form';
import Task from '../components/Task';
import { useTodo } from '../context/TodoContext';

const TasksPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { tasks, createTask } = useTodo();

  const onSubmit = handleSubmit(async (data) => {
    createTask(data);
    reset();
  });

  if (!tasks) return null;

  const tasksReverse = [...tasks].reverse();

  return (
    <div>
      <section>
        <h2>Add Task</h2>
        <form onSubmit={onSubmit}>
          <input
            {...register('description', {
              required: 'description is required',
            })}
            type='text'
            placeholder='description...'
          />
          {errors.description && <p>{errors.description.message}</p>}
          <input type='submit' />
        </form>
      </section>
      <hr />
      <section>
        <h2>Tasks List</h2>
        {tasksReverse.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </section>
    </div>
  );
};

export default TasksPage;
