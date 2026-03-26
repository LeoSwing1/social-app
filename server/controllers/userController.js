import User from "../models/User.js";
import Post from "../models/Post.js";


// =======================
// 🔥 FOLLOW / UNFOLLOW
// =======================
export const toggleFollow = async (req, res) => {
  try {
    const { userId, targetId } = req.body;

    // ❌ Prevent self-follow
    if (userId === targetId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const user = await User.findById(userId);
    const target = await User.findById(targetId);

    // ❌ Check users exist
    if (!user || !target) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = user.following.includes(targetId);

    if (isFollowing) {
      // 🔻 UNFOLLOW
      user.following = user.following.filter(
        id => id.toString() !== targetId
      );

      target.followers = target.followers.filter(
        id => id.toString() !== userId
      );

    } else {
      // 🔺 FOLLOW
      user.following.push(targetId);
      target.followers.push(userId);
    }

    await user.save();
    await target.save();

    res.json({
      message: isFollowing ? "Unfollowed" : "Followed",
      following: user.following
    });

  } catch (err) {
    console.log("FOLLOW ERROR:", err);
    res.status(500).json({ message: "Follow error" });
  }
};


// =======================
// 🔍 SEARCH USERS
// =======================
export const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.q || "";

    const users = await User.find({
      name: { $regex: keyword, $options: "i" }
    }).select("name _id");

    res.json(users);

  } catch (err) {
    console.log("SEARCH ERROR:", err);
    res.status(500).json({ message: "Search error" });
  }
};


// =======================
// 👤 GET USER PROFILE
// =======================
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // 🔥 Get user (exclude password)
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 Get posts (FIXED)
    const posts = await Post.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json({
      user,
      posts
    });

  } catch (err) {
    console.log("PROFILE ERROR:", err);
    res.status(500).json({ message: "Profile error" });
  }
};