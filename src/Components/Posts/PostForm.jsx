import React, { useState } from "react";
import { FaImage, FaPaperPlane, FaRegFileAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import UnderLineImg from "/src/assets/Underline.png";
import { motion } from "framer-motion";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      toast.error("Caption is required !!!", { autoClose: 2000 });
      return;
    }

    const newPost = {
      text,
      image,
      createdAt: new Date().toLocaleString(),
      id: Date.now(),
      likes: 0,
      liked: false,
      comments: [],
    };

    addPost(newPost);
    toast.success("Post Created Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setText("");
    setImage(null);
  };

  return (
    <>
      <div className="text-center">
        <motion.h1
          className="font-mono font-extrabold text-2xl sm:text-3xl lg:text-4xl inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create New Post ✍️
        </motion.h1>
        <motion.div
          className="mt-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <img
            src={UnderLineImg}
            alt="Underline"
            className="mx-auto w-40 h-auto object-contain"
          />
        </motion.div>
      </div>

      <motion.form
        onSubmit={(e) => handleSubmit(e)}
        className="space-y-5 mt-10 p-5 border border-gray-300 bg-gray-50 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <label className="mb-2 font-medium text-gray-700 flex items-center gap-2">
            <FaRegFileAlt className="w-5 h-5 text-[#040174]" /> Caption
          </label>
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something amazing..."
            className="w-full border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <label className="mb-2 font-medium text-gray-700 flex items-center gap-2">
            <FaImage className="w-5 h-5 text-[#040174]" /> Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-4 rounded-lg w-full max-h-64 object-cover"
            />
          )}
        </motion.div>

        <motion.button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-white shadow-md hover:opacity-90 font-medium py-3 rounded-md transition cursor-pointer"
          whileTap={{ scale: 0.98 }}
          
        >
          <FaPaperPlane className="w-4 sm:w-5 h-4 sm:h-5" /> Post Now
        </motion.button>
      </motion.form>
    </>
  );
};

export default PostForm;
