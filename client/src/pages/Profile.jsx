import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

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

        {/* PROFILE CARD */}
        <div style={styles.card}>
          
          {/* AVATAR */}
          <div style={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2>{user?.name}</h2>

          <p style={styles.email}>{user?.email}</p>

          {/* BALANCE */}
          <div style={styles.balanceBox}>
            <p>Wallet Balance</p>
            <h3>₹0.00</h3>
          </div>

          {/* DETAILS */}
          <div style={styles.details}>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Mobile:</strong> Not added</p>
          </div>

          {/* BUTTON */}
          <button style={styles.editBtn}>
            ✏️ Edit Profile
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
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#007bff",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    margin: "auto"
  },

  email: {
    color: "#777",
    fontSize: 14
  },

  balanceBox: {
    background: "#e6f4ea",
    padding: 10,
    borderRadius: 10,
    marginTop: 15
  },

  details: {
    textAlign: "left",
    marginTop: 15,
    lineHeight: 1.8
  },

  editBtn: {
    marginTop: 20,
    padding: 10,
    border: "none",
    background: "#007bff",
    color: "#fff",
    borderRadius: 10,
    cursor: "pointer"
  }
};