import { Link } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';

const Task = ({ task }) => {
  const { deleteTask } = useTodo();

  return (
    <div style={{ border: '1px solid', marginBottom: '10px' }}>
      <div>Description: {task.description}</div>
      <br />
      <Link to={`/tasks/${task.id}`}>Details</Link>
      <br />
      <br />
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
