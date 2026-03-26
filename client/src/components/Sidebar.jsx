import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
  toast.success("Logged out successfully 👋");

  // delay for animation feel
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }, 800);
};

  return (
    <div
      style={{
        ...styles.sidebar,
        transform: isOpen ? "translateX(0)" : "translateX(-100%)"
      }}
    >
      {/* 👤 PROFILE SECTION */}
      <div style={styles.profile}>
        <div style={styles.avatar}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <h3 style={{ margin: 5 }}>{user?.name || "User"}</h3>
        <p style={styles.email}>{user?.email}</p>
      </div>

      {/* 🔍 SEARCH */}
      <input placeholder="Search users..." style={styles.search} />

      {/* NAVIGATION */}
      <button onClick={() => navigate("/")} style={styles.btn}>
        🏠 Feed
      </button>

      <button onClick={() => navigate("/profile")} style={styles.btn}>
        👤 Profile
      </button>

      <button onClick={() => navigate("/settings")} style={styles.btn}>
  ⚙️ Settings
</button>

      {/* LOGOUT */}
      <button
  onClick={logout}
  style={styles.logout}
  onMouseOver={(e) => (e.target.style.opacity = 0.8)}
  onMouseOut={(e) => (e.target.style.opacity = 1)}
>
  🚪 Logout
</button>
    </div>
  );
}

const styles = {
  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    width: 260,
    padding: 20,
    zIndex: 1000,

    // 🔥 GLASS EFFECT
    background: "rgb(255, 255, 255)",
    backdropFilter: "blur(20px)",
    borderRight: "1px solid rgba(6, 3, 3, 0.2)",

    transition: "0.3s ease"
  },

  profile: {
    textAlign: "center",
    marginBottom: 20
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    background: "#007bff",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    margin: "auto"
  },

  email: {
    fontSize: 12,
    color: "#000000"
  },

  search: {
    width: "100%",
    padding: 10,
    margin: "15px 0",
    borderRadius: 10,
    border: "none"
  },

  btn: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    background: "rgba(255,255,255,0.2)",
    color: "#000000",
    transition: "0.2s"
  },

  logout: {
  width: "100%",
  padding: 12,
  marginTop: 20,
  background: "#ff4d4f",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  transition: "0.3s ease",
}}