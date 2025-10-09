import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import TaskColumn from "./components/TaskColumn";
import TaskForm from "./components/TaskForm";
import api from "./api/axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const statuses = ["Todo", "In Progress", "Done"];

  // ✅ DnD sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ✅ Add new task
  const addTask = async (task) => {
    try {
      const res = await api.post("/tasks", task);
      setTasks((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ✅ Update task status (PUT API)
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await api.put(`/tasks/${id}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // ✅ Handle Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // if dropped outside or same column, ignore
    if (!over || active.id === over.id) return;

    const draggedTask = tasks.find((t) => t._id === active.id);
    const newStatus = over.id;

    if (draggedTask && draggedTask.status !== newStatus) {
      updateStatus(active.id, newStatus);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🧠 Smart Issue Tracker</h1>
      <TaskForm addTask={addTask} />

      {/* DnD Context wraps all columns */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {statuses.map((status) => (
            <TaskColumn
              key={status}
              id={status}
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default App;





// import { useEffect, useState } from "react";
// import TaskColumn from "./components/TaskColumn";
// import TaskForm from "./components/TaskForm";
// import api from "./api/axios";

// function App() {
//   const [tasks, setTasks] = useState([]);

//   // ✅ Fetch tasks from backend
//   const fetchTasks = async () => {
//     try {
//       const res = await api.get("/tasks");
//       setTasks(res.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   // ✅ Add new task
//   const addTask = async (task) => {
//     try {
//       const res = await api.post("/tasks", task);
//       setTasks((prev) => [...prev, res.data]);
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   // ✅ Update task status
//   const updateStatus = async (id, newStatus) => {
//     try {
//       const res = await api.put(`/tasks/${id}`, { status: newStatus });
//       setTasks((prev) =>
//         prev.map((task) => (task._id === id ? res.data : task))
//       );
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   // ✅ Delete a task
//   const deleteTask = async (id) => {
//     try {
//       await api.delete(`/tasks/${id}`);
//       setTasks((prev) => prev.filter((task) => task._id !== id));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Load tasks on page load
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const statuses = ["Todo", "In Progress", "Done"];

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">🧠 Smart Issue Tracker</h1>

//       <TaskForm addTask={addTask} />

//       <div className="grid md:grid-cols-3 gap-6 mt-8">
//         {statuses.map((status) => (
//           <TaskColumn
//             key={status}
//             status={status}
//             tasks={tasks.filter((t) => t.status === status)}
//             updateStatus={updateStatus}
//             deleteTask={deleteTask}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;





// import { useState } from "react";
// import TaskColumn from "./components/TaskColumn";
// import TaskForm from "./components/TaskForm";

// function App() {
//   const [tasks, setTasks] = useState([]);

//   const addTask = (task) => setTasks([...tasks, task]);

//   const updateStatus = (id, newStatus) => {
//     setTasks(tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
//   };

//   const statuses = ["Todo", "In Progress", "Done"];

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">
//         🧠 Smart Issue Tracker
//       </h1>
//       <TaskForm addTask={addTask} />
//       <div className="grid md:grid-cols-3 gap-6 mt-8">
//         {statuses.map((status) => (
//           <TaskColumn
//             key={status}
//             status={status}
//             tasks={tasks.filter((t) => t.status === status)}
//             updateStatus={updateStatus}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
