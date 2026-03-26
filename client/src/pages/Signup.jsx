import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed ❌");
        return;
      }

      alert("Signup success ✅");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Signup 🚀</h2>

        <form onSubmit={handleSignup}>
          <input
            placeholder="Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={styles.input}
          />

          <input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            style={styles.input}
          />

          <button style={styles.button}>Signup</button>
        </form>

        <p style={{ marginTop: 10 }}>
          Already have account? <Link to="/login">Login</Link>
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
    background: "#1e1e2f"
  },
  card: {
    padding: 30,
    background: "#2c2c54",
    borderRadius: 10,
    color: "#fff",
    width: 300,
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "10px 0",
    borderRadius: 5,
    border: "none"
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#4ecdc4",
    border: "none",
    borderRadius: 5,
    color: "#fff",
    cursor: "pointer"
  }
};