import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addNewPost } from "../../features/posts/postSlice";
import { selectAllUsers } from "../../features/users/usersSlice";
const AddPostForm = () => {
  const dispatch = useDispatch();
  //global State
  const authors = useSelector(selectAllUsers);
  //states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  // for can save
  const canSave =
    [title, content, authorId].every(Boolean) && addRequestStatus === "idle";
  //handler
  const changeTitle = (e) => setTitle(e.target.value);
  const changeContent = (e) => setContent(e.target.value);
  const changeAuthorId = (e) => setAuthorId(e.target.value);
  //submit Handler
  const submitForm = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addNewPost({ title, body: content, userId: authorId })
        ).unwrap();

        setContent("");
        setTitle("");
        setAuthorId("");
        // console.log("done");
      } catch (error) {
        console.error("fail to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  return (
    <section className="newpost__wrapper">
      <h2>Add New Post</h2>
      <form className="form__wrapper">
        <input
          type="text"
          value={title}
          placeholder="Add Title"
          onChange={(e) => changeTitle(e)}
          required
        ></input>
        <select
          name="author"
          id="author"
          value={authorId}
          onChange={changeAuthorId}
        >
          <option value="">Please Select Author</option>
          {authors.map((author) => (
            <option value={author.id} key={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Add content"
          value={content}
          onChange={(e) => changeContent(e)}
          required
        ></textarea>
        <button type="button" onClick={submitForm} disabled={!canSave}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
