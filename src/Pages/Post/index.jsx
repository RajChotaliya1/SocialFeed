import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import PostForm from "../../Components/Posts/PostForm";
import { paths } from "../../constant/Paths";

const PostPage = () => {
  const navigate = useNavigate();
  const { addPost } = useOutletContext();

  const handlePostSubmit = (newPost) => {
    addPost(newPost);
    navigate(paths.home);
  };

  return (
    <div className="container mx-auto p-1  max-w-4xl ">
      <PostForm addPost={handlePostSubmit} />
    </div>
  );
};

export default PostPage;
