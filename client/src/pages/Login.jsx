import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      // ❌ ERROR
      if (!res.ok) {
        toast.error(data.message || "Invalid credentials ❌");
        setLoading(false);
        return;
      }

      // ✅ SAVE
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 UPDATE STATE
      setToken(data.token);

      // ✅ TOAST FIRST
      toast.success("Welcome back 🚀");

      // ✅ NAVIGATE (NO DELAY NEEDED NOW)
      navigate("/");

    } catch (err) {
      console.log(err);
      toast.error("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login 🚀</h2>

        <form onSubmit={handleLogin}>
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

          <button type="submit" style={styles.loginBtn}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={() => navigate("/signup")}
          style={styles.signupBtn}
        >
          Create Account 🚀
        </button>
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
    background: "linear-gradient(135deg, #1e1e2f, #2c2c54)"
  },

  card: {
    padding: 30,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: 15,
    color: "#fff",
    width: 320,
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

  loginBtn: {
    width: "100%",
    padding: 12,
    background: "#ff6b6b",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    marginTop: 10,
    fontWeight: "bold"
  },

  signupBtn: {
    width: "100%",
    padding: 12,
    background: "#4ecdc4",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    marginTop: 15,
    fontWeight: "bold"
  }
};