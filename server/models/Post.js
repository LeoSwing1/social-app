import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String
    },

    text: String,
    image: String,

    // ✅ NEW FIELD (CRITICAL)
    isAnonymous: {
      type: Boolean,
      default: false
    },

    likes: {
      type: Number,
      default: 0
    },

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    comments: {
      type: [
        {
          user: {
            name: String
          },
          text: String,
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

// ✅ THIS LINE IS IMPORTANT
export default mongoose.model("Post", postSchema);