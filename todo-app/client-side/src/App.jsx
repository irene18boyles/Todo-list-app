import { useEffect, useState } from "react";
import axios from "axios";

import AuthPage from "./pages/AuthPage";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const fetchTodos = async (authToken) => {
    try {
      const res = await axios.get("http://localhost:8000/api/todos", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      fetchTodos(token);
    }
  }, [token]);

  const handleAuthSuccess = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
    fetchTodos(newToken);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuthenticated(false);
    setTodos([]);
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const res = await axios.post("http://localhost:8000/api/todos", newTodo);
      setTodos([...todos, res.data]);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const { title, task, priority, status } = updatedTodo;
      const res = await axios.put(
        `http://localhost:8000/api/todos/${id}`,
        { title, task, priority, status }
      );

      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const closeModal = () => setShowForm(false);

  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-title">Todo List</div>
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </nav>

      <div className="todo-container">
        <button className="add-button" onClick={() => setShowForm(true)}>
          Add Item
        </button>
        <div className="todo-list-scroll">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <TodoForm onAdd={handleAddTodo} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
