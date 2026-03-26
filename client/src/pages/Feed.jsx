import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CreatePost from "../components/CreatePost";
import Filters from "../components/Filters";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) || { name: "User" };

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = process.env.REACT_APP_API_URL;

  // 🔥 FETCH POSTS (FIXED WITH useCallback)
  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [API]);

  // 🔥 LOAD POSTS
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 🔥 CREATE POST
  const createPost = async () => {
    if (!text.trim() && !image) return;

    try {
      const res = await fetch(`${API}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text,
          image,
          user: { name: user.name }
        })
      });

      const newPost = await res.json();

      setPosts((prev) => [newPost, ...prev]);

      setText("");
      setImage(null);

      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.wrapper}>
      
      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(false)}
      />

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN APP */}
      <div style={styles.app}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* CREATE POST */}
        <CreatePost
          text={text}
          setText={setText}
          createPost={createPost}
          setImage={setImage}
          image={image}
        />

        <Filters />

        {/* LOADING */}
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

        {/* EMPTY */}
        {!loading && posts.length === 0 && (
          <p style={{ textAlign: "center" }}>No posts yet</p>
        )}

        {/* POSTS */}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#f1f5f9",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center"
  },

  app: {
    width: 400,
    background: "#f8fafc",
    minHeight: "100vh",
    padding: 12
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)"
  }
};