import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);

  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;

  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  // 🔥 FETCH PROFILE
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/users/${id}`);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, [id, API]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!data) return <p style={{ padding: 20 }}>Loading...</p>;

  const user = data.user || {};
  const posts = data.posts || [];

  const isFollowing = user?.followers?.includes(currentUser?._id);

  // 🔥 FOLLOW / UNFOLLOW
  const handleFollow = async () => {
    try {
      await fetch(`${API}/api/users/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: currentUser._id,
          targetId: user._id
        })
      });

      fetchProfile(); // refresh without reload
    } catch (err) {
      console.log(err);
    }
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
      <div style={styles.main}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* CONTENT (SAME WIDTH AS FEED) */}
        <div style={styles.container}>

          {/* PROFILE CARD */}
          <div style={styles.card}>
            <div style={styles.row}>
              
              <div style={styles.left}>
                <div style={styles.avatar}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 style={{ margin: 0 }}>{user?.name}</h3>
                  <p style={styles.email}>{user?.email}</p>
                </div>
              </div>

              {currentUser._id !== user._id && (
                <button style={styles.followBtn} onClick={handleFollow}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>

            {/* STATS */}
            <div style={styles.stats}>
              <span>
                <strong>{user.followers?.length || 0}</strong> Followers
              </span>
              <span>
                <strong>{user.following?.length || 0}</strong> Following
              </span>
            </div>
          </div>

          {/* POSTS */}
          {posts.length === 0 && (
            <p style={{ color: "#666" }}>No posts yet</p>
          )}

          {posts.map(post => (
            <div key={post._id} style={styles.card}>
              <p>{post.text}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  style={styles.image}
                />
              )}

              <p style={styles.likes}>❤️ {post.likes}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
const styles = {
  wrapper: {
    display: "flex"
  },

  main: {
    flex: 1,
    background: "#f5f6fa", // ✅ SAME AS FEED
    minHeight: "100vh"
  },

  container: {
    maxWidth: 600,
    margin: "auto",
    padding: 20
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)"
  },

  card: {
    background: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  left: {
    display: "flex",
    gap: 10,
    alignItems: "center"
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    background: "#3b82f6",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },

  email: {
    fontSize: 12,
    color: "#888"
  },

  followBtn: {
    padding: "6px 14px",
    borderRadius: 20,
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer"
  },

  stats: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 10,
    fontSize: 14
  },

  image: {
    width: "100%",
    borderRadius: 10,
    marginTop: 10
  },

  likes: {
    marginTop: 5,
    color: "#e91e63"
  }
};