

export default function Header({ toggleSidebar }) {
  return (
    <div style={styles.header}>
      
      {/* MENU BUTTON */}
      <span onClick={toggleSidebar} style={styles.menu}>☰</span>

      <h3>GenX</h3>

      <div style={styles.right}>
        <div style={styles.coin}>⭐ 50</div>
        <div style={styles.balance}>₹0.00</div>
        <span>🔔</span>
        <div style={styles.avatar}></div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  menu: {
    fontSize: 20,
    cursor: "pointer"
  },

  right: {
    display: "flex",
    gap: 8,
    alignItems: "center"
  },

  coin: { background: "#fff", padding: "4px 10px", borderRadius: 20 },
  balance: { background: "#e6f4ea", padding: "4px 10px", borderRadius: 20 },
  avatar: { width: 30, height: 30, borderRadius: "50%", background: "#ffa500" }
};