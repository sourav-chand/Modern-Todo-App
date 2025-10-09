import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function TaskColumn({ id, status, tasks, deleteTask }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-2xl shadow-md p-4 min-h-[400px] flex flex-col"
    >
      <h3 className="text-lg font-bold mb-3 text-center text-indigo-600">
        {status}
      </h3>

      <div className="space-y-3 flex-1">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} deleteTask={deleteTask} />
          ))
        )}
      </div>
    </div>
  );
}

// import TaskCard from "./TaskCard";

// export default function TaskColumn({ status, tasks, updateStatus, deleteTask }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-4 min-h-[400px]">
//       <h3 className="text-lg font-bold mb-3 text-center text-indigo-600">{status}</h3>
//       <div className="space-y-3">
//         {tasks.length === 0 ? (
//           <p className="text-gray-400 text-center">No tasks</p>
//         ) : (
//           tasks.map((task) => (
//             <TaskCard
//               key={task._id}
//               task={task}
//               updateStatus={updateStatus}
//               deleteTask={deleteTask}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// import TaskCard from "./TaskCard";

// export default function TaskColumn({ status, tasks, updateStatus }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-4 min-h-[400px]">
//       <h3 className="text-lg font-bold mb-3 text-center text-indigo-600">
//         {status}
//       </h3>
//       <div className="space-y-3">
//         {tasks.length === 0 ? (
//           <p className="text-gray-400 text-center">No tasks</p>
//         ) : (
//           tasks.map((task) => (
//             <TaskCard
//               key={task.id}
//               task={task}
//               updateStatus={updateStatus}
//               status={status}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
