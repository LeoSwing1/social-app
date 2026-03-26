import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    // 🔥 Save locally (later we connect backend)
    localStorage.setItem("user", JSON.stringify(form));
    alert("Settings saved ✅");
  };

  return (
    <div style={styles.wrapper}>
      
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} />

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <div style={styles.app}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div style={styles.card}>
          <h2>⚙️ Settings</h2>

          {/* INPUTS */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            style={styles.input}
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            style={styles.input}
          />

          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            style={styles.input}
          />

          {/* TOGGLES */}
          <div style={styles.toggleRow}>
            <span>🔔 Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>

          <div style={styles.toggleRow}>
            <span>🌙 Dark Mode</span>
            <input type="checkbox" />
          </div>

          {/* SAVE BUTTON */}
          <button onClick={saveChanges} style={styles.saveBtn}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    background: "#e9edf2",
    minHeight: "100vh",
    position: "relative"
  },

  app: {
    width: 400,
    background: "#f6f7fb",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    zIndex: 2
  },

  overlay: {
    position: "fixed",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    zIndex: 1
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    border: "1px solid #ddd"
  },

  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15
  },

  saveBtn: {
    width: "100%",
    padding: 12,
    marginTop: 20,
    border: "none",
    borderRadius: 10,
    background: "#007bff",
    color: "#fff",
    cursor: "pointer"
  }
};