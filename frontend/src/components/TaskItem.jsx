import { useState } from "react";
import LoadingButton from "./LoadingButton"; // ✅ added

export default function TaskItem({ task, updateStatus, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const [loading, setLoading] = useState(""); // ✅ action-based loader

  const handleUpdate = async () => {
    setLoading("update");
    await updateTask(task._id, newTitle);
    setIsEditing(false);
    setLoading("");
  };

  const handleStatus = async (status) => {
    setLoading(status);
    await updateStatus(task._id, status);
    setLoading("");
  };

  const handleDelete = async () => {
    setLoading("delete");
    await deleteTask(task._id);
    setLoading("");
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          {/* ✅ SAVE BUTTON */}
          <LoadingButton
            className="success"
            loading={loading === "update"}
            onClick={handleUpdate}
          >
            Save
          </LoadingButton>
        </>
      ) : (
        <h4>{task.title}</h4>
      )}

      <p>Status: {task.status}</p>

      <button className="warning" onClick={() => setIsEditing(!isEditing)}>
        Edit
      </button>

      {/* ✅ STATUS BUTTONS */}
      <LoadingButton
        loading={loading === "todo"}
        onClick={() => handleStatus("todo")}
      >
        Todo
      </LoadingButton>

      <LoadingButton
        loading={loading === "in-progress"}
        onClick={() => handleStatus("in-progress")}
      >
        In Progress
      </LoadingButton>

      <LoadingButton
        className="success"
        loading={loading === "done"}
        onClick={() => handleStatus("done")}
      >
        Done
      </LoadingButton>

      {/* ✅ DELETE BUTTON */}
      <LoadingButton
        className="danger"
        loading={loading === "delete"}
        onClick={handleDelete}
      >
        Delete
      </LoadingButton>
    </div>
  );
}