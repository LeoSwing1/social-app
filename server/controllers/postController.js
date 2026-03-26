import Post from "../models/Post.js";

// ✅ CREATE POST
export const createPost = async (req, res) => {
  try {
    const { text, image, user } = req.body;

    const newPost = new Post({
      text,
      image,
      user
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
};

// ✅ GET POSTS
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// ❤️ LIKE
export const toggleLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likedBy.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likedBy = post.likedBy.filter(
        (id) => id.toString() !== userId
      );
      post.likes = Math.max(post.likes - 1, 0);
    } else {
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Like error" });
  }
};

// 💬 COMMENT (FINAL FIXED)
export const addComment = async (req, res) => {
  try {
    const { postId, text, user } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ text, user });

    await post.save();

    // 🔥 THIS LINE IS CRITICAL
    res.json(post);

  } catch (err) {
    res.status(500).json({ message: "Comment error" });
  }
};