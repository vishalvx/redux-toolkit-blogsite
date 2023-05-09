import React from "react";
import { useDispatch } from "react-redux";
import { addReaction, selectAllPosts } from "../../features/posts/postSlice";

const reactionEmoji = {
  thumpsup: "👍",
  heart: "❤️",
  wow: "😲",
  rocket: "🚀",
};

const ReactionButton = ({ post }) => {
  const dispatch = useDispatch();

  return Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reaction__btn"
        onClick={() =>
          dispatch(addReaction({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
};

export default ReactionButton;
