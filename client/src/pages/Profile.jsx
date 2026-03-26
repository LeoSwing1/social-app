import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);

  const { id } = useParams();

  const API = process.env.REACT_APP_API_URL;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // 🔥 FETCH PROFILE DATA
  useEffect(() => {
    fetch(`${API}/api/users/${id}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [id, API]);

  if (!data) return <p style={{ color: "#fff" }}>Loading...</p>;

  const user = data.user;

  // 🔥 CHECK FOLLOWING
  const isFollowing = user.followers.includes(currentUser._id);

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

      // refresh profile
      window.location.reload();
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
      <div style={styles.app}>
        
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* PROFILE CARD */}
        <div style={styles.card}>
          
          <div style={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2>{user?.name}</h2>
          <p style={styles.email}>{user?.email}</p>

          {/* FOLLOW BUTTON */}
          {currentUser._id !== user._id && (
            <button onClick={handleFollow} style={styles.followBtn}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}

          {/* STATS */}
          <div style={styles.stats}>
            <p><strong>{user.followers.length}</strong> Followers</p>
            <p><strong>{user.following.length}</strong> Following</p>
          </div>
        </div>

        {/* POSTS SECTION */}
        <div style={styles.posts}>
          <h3 style={{ color: "#fff" }}>Posts</h3>

          {data.posts.length === 0 && (
            <p style={{ color: "#aaa" }}>No posts yet</p>
          )}

          {data.posts.map(post => (
            <div key={post._id} style={styles.postCard}>
              <p>{post.text}</p>

              {post.image && (
                <img src={post.image} alt="" style={styles.postImage} />
              )}

              <p style={styles.likes}>❤️ {post.likes}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}


// 🎨 STYLES
const styles = {
  wrapper: {
    display: "flex"
  },

  app: {
    flex: 1,
    padding: 20,
    background: "#1e1e2f",
    minHeight: "100vh"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)"
  },

  card: {
    background: "#2c2c54",
    padding: 20,
    borderRadius: 12,
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#ff6b6b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    margin: "auto",
    marginBottom: 10
  },

  email: {
    color: "#aaa",
    marginBottom: 10
  },

  followBtn: {
    marginTop: 10,
    padding: 10,
    border: "none",
    borderRadius: 8,
    background: "#4ecdc4",
    cursor: "pointer",
    fontWeight: "bold"
  },

  stats: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 15
  },

  posts: {
    marginTop: 20
  },

  postCard: {
    background: "#2c2c54",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    color: "#fff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  },

  postImage: {
    width: "100%",
    borderRadius: 10,
    marginTop: 10
  },

  likes: {
    marginTop: 5,
    color: "#ff6b6b"
  }
};