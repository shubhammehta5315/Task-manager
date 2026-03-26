import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import TaskItem from "../components/TaskItem";
import LoadingButton from "../components/LoadingButton"; 

export default function Project() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    setBtnLoading(true); 
    try {
      await API.post("/tasks", { title, projectId: id });
      setTitle("");
      fetchTasks();
    } catch {
      setError("Failed to add task");
    } finally {
      setBtnLoading(false);
    }
  };

  const updateStatus = async (taskId, status) => {
    await API.put(`/tasks/${taskId}`, { status });
    fetchTasks();
  };

  const updateTask = async (taskId, newTitle) => {
    await API.put(`/tasks/${taskId}`, { title: newTitle });
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await API.delete(`/tasks/${taskId}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Tasks</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Task"
        />

        {/* ✅ LOADING BUTTON */}
        <LoadingButton
          className="primary"
          loading={btnLoading}
          onClick={addTask}
        >
          Add Task
        </LoadingButton>

        {tasks.map((t) => (
          <TaskItem
            key={t._id}
            task={t}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
    </>
  );
}