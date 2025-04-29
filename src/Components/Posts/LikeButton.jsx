import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const LikeButton = ({ post }) => {
  const { liked, likes } = post;

  const { toggleLike } = useOutletContext();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => toggleLike(post.id)}
        className={`transition-transform duration-200 cursor-pointer ${
          liked ? "text-red-500 scale-110" : "text-gray-400 hover:text-red-400"
        }`}
      >
        {liked ? "❤️" : "🤍"}
      </button>
      <span className="text-gray-600 font-medium">
        {likes} {likes === 1 ? "like" : "likes"}
      </span>
    </div>
  );
};

export default LikeButton;
