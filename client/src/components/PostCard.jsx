import { useState } from "react";

export default function PostCard({ post }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const API = process.env.REACT_APP_API_URL;

  const [likes, setLikes] = useState(post?.likes || 0);
  const [liked, setLiked] = useState(
    post?.likedBy?.some(id => id?.toString() === user?._id) || false
  );

  const [isFollowing, setIsFollowing] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);

  if (!post) return null;

  // ✅ ANONYMOUS LOGIC (UI ONLY)
  const isAnon = post.isAnonymous;

  const displayName = isAnon
    ? "Anonymous 👤"
    : post.user?.name || "User";

  const displayAvatar = isAnon
    ? "👤"
    : post.user?.name?.charAt(0) || "U";

  // 🕒 TIME FORMAT
  const formatTimeAgo = (date) => {
    const now = new Date();
    const d = new Date(date);

    const mins = Math.floor((now - d) / 60000);

    if (mins < 1) return "Just now";
    if (mins < 10) return `${mins} min ago`;

    if (mins < 60) {
      const rounded = Math.floor(mins / 10) * 10;
      return `${rounded} min ago`;
    }

    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    return d.toLocaleDateString("en-IN");
  };

  // ❤️ LIKE
  const handleLike = async () => {
    try {
      const res = await fetch(`${API}/api/posts/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
          userId: user?._id
        })
      });

      const data = await res.json();

      setLikes(data?.likes || 0);
      setLiked(
        data?.likedBy?.some(id => id?.toString() === user?._id) || false
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ❤️ DOUBLE TAP
  const handleDoubleClick = () => {
    if (!liked) handleLike();
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 600);
  };

  // 🔥 FOLLOW
  const handleFollow = async () => {
    try {
      await fetch(`${API}/api/users/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user._id,
          targetId: post.user?._id || post.user?.id
        })
      });

      setIsFollowing(prev => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  // 💬 COMMENT
  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`${API}/api/posts/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
          text: commentText,
          user: { name: user?.name || "User" }
        })
      });

      const data = await res.json();

      setComments(data?.comments || []);
      setCommentText("");
      setShowAllComments(true);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.card}>
      
      <div style={styles.header}>
        <div style={styles.user}>
          <div style={styles.avatar}>
            {displayAvatar}
          </div>

          <strong style={styles.name}>
            {displayName}
          </strong>

          {/* ✅ ANONYMOUS BADGE */}
          {isAnon && (
            <span style={styles.badge}>Anonymous</span>
          )}
        </div>

        <button onClick={handleFollow} style={styles.follow}>
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {post.text && <p style={styles.text}>{post.text}</p>}

      <div style={styles.imageContainer} onDoubleClick={handleDoubleClick}>
        {post.image ? (
          <img src={post.image} alt="" style={styles.image} />
        ) : (
          <div style={styles.placeholder}></div>
        )}

        {showHeart && <div style={styles.heart}>❤️</div>}
      </div>

      <p style={styles.date}>
        {post.createdAt ? formatTimeAgo(post.createdAt) : "Just now"}
      </p>

      <div style={styles.actions}>
        <span
          onClick={handleLike}
          style={{
            cursor: "pointer",
            color: liked ? "#ef4444" : "#475569"
          }}
        >
          {liked ? "❤️" : "🤍"} {likes}
        </span>

        <span>💬 {(comments || []).length}</span>
      </div>

      <div style={styles.commentBox}>
        <input
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={styles.commentInput}
        />

        <button onClick={handleComment} style={styles.commentBtn}>
          Post
        </button>
      </div>

      {(comments || []).length > 0 && (
        <div style={styles.commentsList}>
          {(showAllComments ? comments : comments.slice(0, 2)).map((c, i) => (
            <div key={i} style={styles.commentItem}>
              <strong>{c.user?.name || "User"}:</strong>{" "}
              <span>{c.text || "..."}</span>
            </div>
          ))}

          {(comments || []).length > 2 && (
            <span
              onClick={() => setShowAllComments(!showAllComments)}
              style={styles.viewMore}
            >
              {showAllComments ? "Hide comments" : "View all comments"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    border: "1px solid #e2e8f0"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  user: {
    display: "flex",
    gap: 10,
    alignItems: "center"
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 600
  },

  name: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0f172a"
  },

  // ✅ NEW STYLE
  badge: {
    background: "#e0e7ff",
    color: "#3730a3",
    padding: "2px 8px",
    borderRadius: 8,
    fontSize: 11,
    marginLeft: 6
  },

  follow: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
    cursor: "pointer"
  },

  text: {
    fontSize: 14,
    marginTop: 10,
    color: "#0f172a",
    lineHeight: 1.4
  },

  imageContainer: {
    position: "relative",
    marginTop: 10
  },

  image: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 10
  },

  placeholder: {
    height: 140,
    background: "#e2e8f0",
    borderRadius: 10
  },

  heart: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(1.5)",
    fontSize: 40
  },

  date: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 6
  },

  actions: {
    marginTop: 10,
    display: "flex",
    gap: 20,
    fontSize: 13,
    color: "#475569"
  },

  commentBox: {
    marginTop: 10,
    display: "flex",
    gap: 8
  },

  commentInput: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: "1px solid #e2e8f0"
  },

  commentBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },

  commentsList: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 6
  },

  commentItem: {
    fontSize: 13,
    color: "#334155",
    background: "#f1f5f9",
    padding: "6px 10px",
    borderRadius: 8
  },

  viewMore: {
    fontSize: 12,
    color: "#2563eb",
    cursor: "pointer",
    marginTop: 4
  }
};