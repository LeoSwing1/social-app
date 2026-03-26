 import User from "../models/User.js";

// 🔥 FOLLOW / UNFOLLOW
export const toggleFollow = async (req, res) => {
  try {
    const { userId, targetId } = req.body;

    if (userId === targetId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const user = await User.findById(userId);
    const target = await User.findById(targetId);

    const isFollowing = user.following.includes(targetId);

    if (isFollowing) {
      user.following = user.following.filter(id => id.toString() !== targetId);
      target.followers = target.followers.filter(id => id.toString() !== userId);
    } else {
      user.following.push(targetId);
      target.followers.push(userId);
    }

    await user.save();
    await target.save();

    res.json({ following: user.following });

  } catch (err) {
    res.status(500).json({ message: "Follow error" });
  }
};
export const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.q;

    const users = await User.find({
      name: { $regex: keyword, $options: "i" }
    }).select("name _id");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Search error" });
  }
};