import './App.css';
import { useEffect, useState } from 'react';
import TodoContextProvider from './contexts/TodoContextProvider';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            try {
                const parsedTodos = JSON.parse(storedTodos);
                if (Array.isArray(parsedTodos)) {
                    setTodos(parsedTodos);
                }
            } catch (error) {
                console.error('Error parsing todos from localStorage:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    function addTodo (todo) {
        setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
    }

    function updateTodo(id, updatedTodo) {
        setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
        );
    }

    function deleteTodo(id) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    function toggleComplete(id) {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    return (
        <TodoContextProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
            <div style={{ backgroundColor: '#172842', minHeight: '100vh' }} className="overflow-hidden flex flex-col">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => (
                            <div key={todo.id} className='w-full'>
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoContextProvider>
    );
}

export default App;
