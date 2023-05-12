import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//customs Selector
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "../../features/posts/postSlice";
// components
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus]);

  let postContent;

  if (postsStatus === "loading") {
    postContent = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    postContent = <PostExcerpt posts={orderedPosts} />;
  } else if (postsStatus === "failed") {
    postContent = <p>{postsError}</p>;
  }

  return (
    <section className="posts">
      <h1>Posts</h1>
      {postContent}
    </section>
  );
};

export default PostsList;
