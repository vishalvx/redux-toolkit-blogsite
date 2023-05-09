import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../features/users/usersSlice";

const PostAuthor = ({ authorId }) => {
  const authors = useSelector(selectAllUsers);
  const postAuthor = authors.find((author) => author.id === authorId);
  return <span>by {postAuthor ? postAuthor.name : "Unkown Author"}</span>;
};

export default PostAuthor;
