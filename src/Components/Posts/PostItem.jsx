import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { MdPerson, MdDelete, MdMoreVert, MdEdit } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import { auth } from "../../constant/Firebase";
import { FaRegComment } from "react-icons/fa";
import { toast } from "react-toastify";

const PostItem = ({ post }) => {
  const { toggleLike, deletePost, editPostText } = useOutletContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);
  const [showComments, setShowComments] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleDelete = () => {
    deletePost(post.id);
    setShowDropdown(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  const handleSave = () => {
    editPostText(post.id, editedText);
    setIsEditing(false);
    toast.success("Post edited successfully!", { autoClose: 2000 });
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({ email: currentUser.email });
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm space-y-5 border border-gray-200 transition-all hover:shadow-3xl relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-gray-300 to-gray-400 shadow-inner mr-2">
            <MdPerson className="text-white text-2xl" />
          </div>
          <div className="text-lg font-bold text-gray-800 mb-1">
            {user?.email?.split("@")[0]}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="text-gray-500 hover:text-gray-700 cursor-pointer "
            title="Options"
          >
            <MdMoreVert className="text-2xl" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 w-24 bg-white border border-gray-200 rounded-lg shadow-md z-10">
              <button
                onClick={handleEdit}
                className="flex items-center w-full px-3 py-2 text-sm text-blue-500 hover:bg-blue-50 hover:text-blue-700 cursor-pointer "
              >
                <MdEdit className="mr-2 text-lg" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer "
              >
                <MdDelete className="mr-2 text-lg" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
            rows="4"
          />
          <div className="mt-2 flex justify-end space-x-3">
            <button
              onClick={handleSave}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md shadow-sm hover:shadow-md hover:opacity-90 cursor-pointer"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-1.5 bg-gray-200 text-black rounded-md hover:shadow-sm hover:bg-gray-300  cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 text-lg font-bold">{post.text}</p>
      )}

      {post.image && (
        <img
          src={post.image}
          alt="Post Image"
          className="w-full h-auto rounded-lg object-cover border border-gray-100 focus:ring-1 focus:ring-gray-400"
        />
      )}

      <div className="text-gray-400 text-xs">{post.createdAt}</div>

      <div className="flex items-center space-x-4">
        <LikeButton post={post} toggleLike={toggleLike} />

        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FaRegComment className="text-lg cursor-pointer" />
          <span className="ml-2 text-sm text-gray-500">
            {post.comments ? post.comments.length : 0}
          </span>
        </button>
      </div>

      {showComments && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 0.5,
          }}
        >
          <div className="mt-4">
            <CommentSection post={post} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PostItem;
