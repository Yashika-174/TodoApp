import { useState, useContext } from 'react';
import { TodoContext } from '../contexts/todoContext';

export default function TodoForm() {
  const { addTodo } = useContext(TodoContext);
  const [todo, setTodo] = useState("");

  function add(event) {
    event.preventDefault();
    if (!todo) return;
    addTodo({ todo:todo, completed: false });
    setTodo("");
  }

  function handleChange(event) {
    setTodo(event.target.value);
  }

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={handleChange}
      />
      <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
      </button>
    </form>
  );
}
