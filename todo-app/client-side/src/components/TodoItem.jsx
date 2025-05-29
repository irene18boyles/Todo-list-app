import "../styles/TodoItem.css";

function TodoItem({ todo, onUpdate, onDelete }) {
  const toggleStatus = () => {
    const { _id, title, task, priority, status } = todo;

    onUpdate(_id, {
      title,
      task,
      priority,
      status: status === "completed" ? "pending" : "completed",
    });
  };

  return (
    <div className="card flex justify-between items-start">
      <div>
        <h2 className="font-bold text-lg">{todo.title}</h2>
        <p>{todo.task}</p>
        <p className="text-sm text-gray-500 mt-1">
          Status: {todo.status} | Priority: {todo.priority}
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <button onClick={toggleStatus} className="button-yellow">
          Toggle
        </button>
        <button onClick={() => onDelete(todo._id)} className="button-red">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
