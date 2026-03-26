import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    // 🔥 BASIC VALIDATION
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed ❌");
        setLoading(false);
        return;
      }

      alert("Signup success ✅");

      // 🔥 RESET FORM
      setForm({
        name: "",
        email: "",
        password: ""
      });

      navigate("/login");

    } catch (err) {
      console.log("SIGNUP ERROR:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Signup 🚀</h2>

        <form onSubmit={handleSignup}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p style={{ marginTop: 10 }}>
          Already have account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e1e2f, #2c2c54)",
    padding: 10
  },

  card: {
    padding: 30,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: 15,
    color: "#fff",
    width: "100%",
    maxWidth: 320,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },

  input: {
    width: "100%",
    padding: 12,
    margin: "10px 0",
    borderRadius: 8,
    border: "none",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: 12,
    background: "#4ecdc4",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    marginTop: 10,
    fontWeight: "bold"
  },

  link: {
    color: "#4ecdc4",
    textDecoration: "none",
    fontWeight: "bold"
  }
};