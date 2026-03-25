import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    try {
      await API.post("/projects", { title });
      setTitle("");
      fetchProjects();
    } catch {
      setError("Failed to create project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Projects</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Project" />
        <button className="primary" onClick={createProject}>Add Project</button>

        {projects.map((p) => (
          <div className="card" key={p._id} onClick={() => navigate(`/project/${p._id}`)}>
            <h4>{p.title}</h4>
          </div>
        ))}
      </div>
    </>
  );
}