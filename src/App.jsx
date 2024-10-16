import { useState, useEffect } from 'react';
import Navbar from './conmponents/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null); // New state for editing
  const [error, setError] = useState(""); // State to store error message

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (storedTodos) {
      setTodos(storedTodos); // If there is valid data, set it to state
    }
  },[]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos)); // Only save if todos are present
    }
  }, [todos]);

  // Add or Edit the task
  const handleAdd = () => {
    if (!todo.trim()) {
      setError("Please write something to add"); // Set error message if input is empty
      return;
    }
    
    if (editId) {
      // Editing existing todo
      const updatedTodos = todos.map((item) =>
        item.id === editId ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setEditId(null); // Clear edit state after updating
    } else {
      // Adding a new todo
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo(""); // Clear the input after adding or editing
  };

  // Edit a task
  const handleEdit = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    setTodo(itemToEdit.todo); // Set the current todo text in the input
    setEditId(id); // Set the editId to track which task is being edited
  };

  // Delete a task
  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  // Handle checkbox toggle
  const handleCheck = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  // Handle input change
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 ">
        <div className="add-todo">
          <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Todo' : 'Add a Todo'}</h2>
          
          <input
            onChange={handleChange}
            value={todo}
            className="px-1 border-2 border-violet-200 focus:border-violet-400 outline-none rounded-md w-1/2"
            type="text"
          />
          <button
            className="font-bold border rounded text-white border-violet-600 bg-violet-600 hover:bg-violet-500 hover:text-white text-md px-4 ml-5"
            onClick={handleAdd}
          >
            {editId ? 'Save' : 'Add'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
        </div>
        
        <div className="todos">
          <h2 className="text-xl font-bold my-3">Your Todos</h2>
          {todos.length === 0 ? (
            <div className="text-lg">No Todos To Display</div>
          ) : (
            todos.map((item) => (
              <div className="todos flex mt-4 justify-between w-1/2" key={item.id}>
                <div className="flex">
                  <input
                    name={item.id}
                    onChange={() => handleCheck(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="mr-2"
                  />
                  <p className={item.isCompleted ? 'line-through' : ''}>{item.todo}</p>
                </div>
                <div className="buttons">
                  <button
                    className="font-bold border rounded text-white border-violet-600 bg-violet-600 hover:bg-violet-500 hover:text-white text-md px-4 ml-5"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-bold border rounded text-white border-violet-600 bg-violet-600 hover:bg-violet-500 hover:text-white text-md px-4 ml-5"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;