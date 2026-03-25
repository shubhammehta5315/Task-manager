import { useState } from "react";

export default function TaskItem({ task, updateStatus, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleUpdate = () => {
    updateTask(task._id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <button className="success" onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <h4>{task.title}</h4>
      )}

      <p>Status: {task.status}</p>

      <button className="warning" onClick={() => setIsEditing(!isEditing)}>Edit</button>
      <button onClick={() => updateStatus(task._id, "todo")}>Todo</button>
      <button onClick={() => updateStatus(task._id, "in-progress")}>In Progress</button>
      <button className="success" onClick={() => updateStatus(task._id, "done")}>Done</button>
      <button className="danger" onClick={() => deleteTask(task._id)}>Delete</button>
    </div>
  );
}