import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";

export default function Signup() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const submit = async () => {

    // ✅ EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true); 
    try {
      const res = await API.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", form.email);
      navigate("/dashboard");
    } catch {
      setError("Signup failed");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      {error && <p className="error">{error}</p>}

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
          setError(""); // clear error on typing
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
        Signup
      </LoadingButton>

      {/* ✅ SIGN IN LINK */}
      <p>
        Already have an account?{" "}
        <Link to="/">Sign In</Link>
      </p>
    </div>
  );
}