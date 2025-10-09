import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = { title, desc, status: "Todo" };
    await addTask(newTask);

    setTitle("");
    setDesc("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-5 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Add New Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
      ></textarea>
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-all"
      >
        Add Task
      </button>
    </form>
  );
}
