import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-gray-50 p-4 rounded-xl shadow-sm border hover:shadow-md transition cursor-grab active:cursor-grabbing"
    >
      <h4 className="font-semibold text-gray-800">{task.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{task.desc}</p>

      <div className="flex justify-between items-center">
        <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
          {task.status}
        </span>
        <button
          onClick={() => deleteTask(task._id)}
          className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
