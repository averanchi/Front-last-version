import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from "./../../axios";

export const Index = ({ postId, onCommentAdded }) => {
  const [commentText, setCommentText] = React.useState("");

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`/posts/${postId}/comments`, {
        text: commentText,
      });

      if (response.status === 201) {
        setCommentText("");
        console.log("kuku");
        onCommentAdded();
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Write a comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddComment}>
            Add comment
          </Button>
        </div>
      </div>
    </>
  );
};
