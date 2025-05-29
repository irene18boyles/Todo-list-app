import { useState } from 'react';
import "../styles/TodoForm.css"

function TodoForm({ onAdd }) {
  const [task, setTask] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim() || !title.trim()) return;
    onAdd({ task, title, status, priority });
    setTask('');
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
  <div>
    <label className="label" htmlFor="title">Title</label>
    <input
      id="title"
      name="title"
      type="text"
      className="input"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
  </div>

  <div>
    <label className="label" htmlFor="task">Task</label>
    <input
      id="task"
      name="task"
      type="text"
      className="input"
      value={task}
      onChange={(e) => setTask(e.target.value)}
      required
    />
  </div>

  <div>
    <label className="label" htmlFor="status">Status</label>
    <select
      id="status"
      name="status"
      className="input"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>

  </div>

  <div>
    <label className="label" htmlFor="priority">Priority</label>
    <select
      id="priority"
      name="priority"
      className="input"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

  </div>

  <button type="submit" className="button-blue">Add Todo</button>
</form>

  );
}

export default TodoForm;
