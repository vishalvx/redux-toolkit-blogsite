import React from "react";
import { useSelector } from "react-redux";
//customs Selector
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from "../../features/posts/postSlice";
// components
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  return (
    <section className="posts">
      <h1>Posts</h1>
      {posts.map((post) => (
        <article key={post.id} className="post__wrapper">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p className="postcredit">
            <PostAuthor authorId={post.authorId} />
            <TimeAgo timestamp={post.date} />
          </p>
          <ReactionButton post={post} />
        </article>
      ))}
    </section>
  );
};

export default PostsList;
