export default function Filters() {
  return (
    <div style={styles.container}>
      <button style={{ ...styles.pill, ...styles.active }}>All</button>
      <button style={styles.pill}>Following</button>
      <button style={styles.pill}>Trending</button>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    gap: 8,
    marginBottom: 12
  },

  pill: {
    padding: "5px 12px",
    borderRadius: 20,
    border: "1px solid #e2e8f0",
    background: "#fff",
    fontSize: 13,
    cursor: "pointer",
    color: "#334155"
  },

  active: {
    background: "#2563eb",
    color: "#fff",
    border: "none"
  }
};