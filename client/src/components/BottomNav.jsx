export default function BottomNav() {
  return (
    <div style={styles.nav}>
      <span>🏠</span>
      <span>📋</span>
      <span style={styles.center}>🌐</span>
      <span>👤</span>
      <span>🏆</span>
    </div>
  );
}

const styles = {
  nav: {
    position: "fixed",
    bottom: 10,
    width: 400,
    background: "#1e5eff",
    display: "flex",
    justifyContent: "space-around",
    padding: 12,
    borderRadius: 20,
    color: "#fff"
  },

  center: {
    background: "#fff",
    color: "#000",
    borderRadius: "50%",
    padding: 10
  }
};