import React, { useEffect, useState } from "react";
import { MdMoreVert, MdDelete } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import { auth } from "../../constant/Firebase";
import { HiUserCircle } from "react-icons/hi";

const CommentItem = ({ comment, postId }) => {
  const { deleteComments } = useOutletContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({ email: currentUser.email });
    }
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 ">
          <HiUserCircle className="w-7 h-7" />
          <div className="text-sm font-semibold mb-1">
            {user?.email?.split("@")[0]}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            title="Options"
          >
            <MdMoreVert className="text-xl" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 w-20 bg-white border border-gray-200 rounded-lg shadow z-10">
              <button
                onClick={() => {
                  deleteComments(comment.id, postId);
                  setShowDropdown(false);
                }}
                className="flex items-center px-1.5 py-1 text-sm text-red-500 hover:bg-red-50 hover:text-red-700 w-full cursor-pointer"
              >
                <MdDelete className="mr-2 text-md" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-2">{comment.text}</p>
      <div className="text-gray-500 text-xs mt-1">{comment.createdAt}</div>
    </div>
  );
};

export default CommentItem;
