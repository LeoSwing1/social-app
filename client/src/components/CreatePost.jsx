import { useRef } from "react";

export default function CreatePost({
  text,
  setText,
  createPost,
  setImage,
  image
}) {
  const fileRef = useRef();

  // 🔥 HANDLE IMAGE SELECT
  const handleImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setImage(reader.result); // ✅ BASE64 STRING
  };

  reader.readAsDataURL(file);
};
  return (
    <div style={styles.card}>
      <h4 style={styles.title}>Create Post</h4>

      {/* TEXT INPUT */}
      <input
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />

      {/* FILE INPUT */}
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={handleImage}
      />

      {/* 🔥 IMAGE PREVIEW + REMOVE BUTTON */}
      {image && (
        <div style={styles.previewWrapper}>
          <img src={image} alt="preview" style={styles.preview} />

          <button
            onClick={() => setImage(null)}
            style={styles.removeBtn}
          >
            ✖
          </button>
        </div>
      )}

      {/* BOTTOM BAR */}
      <div style={styles.bottom}>
        <div style={styles.icons}>
          <span onClick={() => fileRef.current.click()}>📷</span>
          <span>😊</span>
        </div>

        {/* 🔥 SMART POST BUTTON */}
        <button
          onClick={createPost}
          style={{
            ...styles.btn,
            opacity: !text && !image ? 0.5 : 1,
            cursor: !text && !image ? "not-allowed" : "pointer"
          }}
          disabled={!text && !image}
        >
          Post
        </button>
      </div>
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

  title: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 8
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    marginBottom: 10
  },

  previewWrapper: {
    position: "relative",
    marginBottom: 10
  },

  preview: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 10
  },

  removeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "rgba(0,0,0,0.7)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 26,
    height: 26,
    cursor: "pointer"
  },

  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  icons: {
    display: "flex",
    gap: 12,
    fontSize: 18,
    cursor: "pointer"
  },

  btn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: 20
  }
};