import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";

export default function Login() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", form.email);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}

      <input
        placeholder="Email"
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
          setError(""); 
        }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <LoadingButton
        className="primary"
        loading={loading}
        onClick={submit}
      >
        Login
      </LoadingButton>

      <p><Link to="/signup">Create account</Link></p>
    </div>
  );
}