import { useState } from "react";

interface TodoItem {
  id: number;
  text: string;
}

const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>("");

  const addTodo = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      { id: Date.now(), text: input },
    ]);

    setInput("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter todo"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-white p-3 rounded shadow"
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
