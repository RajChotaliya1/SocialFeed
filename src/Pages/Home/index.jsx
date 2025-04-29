import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PostFeed from "../../Components/Posts/PostFeed";
import { paths } from "../../constant/Paths";
import { IoIosAddCircle } from "react-icons/io";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const Home = () => {
  const { posts } = useOutletContext();
  const [page, setPage] = useState(1);

  const postsPerPage = 3;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const visiblePosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  const goToPage = (event, pageNum) => {
    setPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.section
      className="max-w-6xl flex flex-col justify-center h-full w-full mx-auto px-1 sm:px-4 lg:px-5"
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      {posts.length === 0 ? (
        <motion.div
          className="flex flex-col h-full items-center justify-end"
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }} 
        >
          <div className="min-h-1/2 flex flex-col items-center justify-between mb-6">
            <p className="text-gray-500 text-lg sm:text-xl text-center">
              No posts yet. Be the first to share something!
            </p>
            <MotionLink
              to={paths.postpage}
              className="block px-6 py-3 rounded-md font-medium bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-white shadow-md hover:opacity-90"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <IoIosAddCircle className="inline w-6 h-6 mr-2" />
              <span>Create New Post</span>
            </MotionLink>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            className="mb-8 flex flex-col justify-between h-full"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.3 }} 
          >
            <PostFeed posts={visiblePosts} />
          </motion.div>

          {posts.length > postsPerPage && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
              <div className="flex items-center justify-center space-x-2">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={goToPage}
                  siblingCount={1}
                  boundaryCount={1}
                  shape="rounded"
                  size="large"
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                      sx={{
                        background:
                          item.page === page
                            ? "linear-gradient(to right, #ff6f61, #fe9a8b)"
                            : "#f3f4f6",
                        color: item.page === page ? "#ffffff" : "#6B7280",
                        fontWeight: "bold",
                        borderRadius: "0.5rem",
                        "&:hover": {
                          background:
                            item.page === page
                              ? "linear-gradient(to right, #ff6f61, #fe9a8b)"
                              : "#e5e7eb",
                        },
                      }}
                    />
                  )}
                />
              </div>

              <div className="text-right w-full sm:w-auto">
                <span className="text-gray-600 font-medium">
                  Page {page} of {totalPages}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-center mb-6">
            <MotionLink
              to={paths.postpage}
              className="block px-4 py-2 rounded-md font-medium bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-white shadow-md hover:opacity-90"
              whileTap={{ scale: 0.98 }}
            >
              <IoIosAddCircle className="inline w-6 h-6 mr-2" />
              <span>Create New Post</span>
            </MotionLink>
          </div>
        </>
      )}
    </motion.section>
  );
};

export default Home;
