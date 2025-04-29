import React, { useState } from "react";
import CommentItem from "./CommentItem";
import { useOutletContext } from "react-router-dom";

const CommentSection = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const { addComment } = useOutletContext();

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (commentText.trim() !== "") {
      const newComment = {
        text: commentText,
        createdAt: new Date().toLocaleString(),
        id: Date.now(),
        user: "Username",
      };

      addComment(post?.id, newComment);
      setCommentText("");
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="space-y-2">
        {post?.comments &&
          post?.comments.length > 0 &&
          post?.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={post.id} />
          ))}
      </div>

      <form
        onSubmit={handleCommentSubmit}
        className="mt-4 flex items-center space-x-2"
      >
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-white hover:opacity-90 cursor-pointer p-1.5 rounded-md "
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;