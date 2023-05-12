import React from "react";
// components
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

const PostExcerpt = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <article key={post.id} className="post__wrapper">
          <h2>{post.title}</h2>
          <p>{post.body.substring(0, 100)}</p>
          <p className="postcredit">
            <PostAuthor authorId={post.userId} />
            <TimeAgo timestamp={post.date} />
          </p>
          <ReactionButton post={post} />
        </article>
      ))}
    </>
  );
};

export default PostExcerpt;
