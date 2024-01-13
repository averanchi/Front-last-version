import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";

export const Index = ({ postId }) => {
  const [commentText, setCommentText] = React.useState("");
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

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
          />
          <Button variant="contained">Add comment</Button>
        </div>
      </div>
    </>
  );
};
