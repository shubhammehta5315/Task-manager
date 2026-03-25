import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h3>Task Manager</h3>

      <div className="nav-right">
        <span>{user}</span>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button className="danger" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}