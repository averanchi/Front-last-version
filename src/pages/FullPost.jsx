import React from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import { selectIsAuth } from "./../redux/slices/auth";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const isAuth = useSelector(selectIsAuth);
  const { id } = useParams();

  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
  }, []);

  React.useEffect(() => {
    axios.get(`/posts/${id}/comments`).then((res) => {
      setComments(res.data);
    });
  }, []);

  const handleCommentAdded = () => {
    console.log("kuku");
    // Перезапросить комментарии после добавления нового комментария
    axios.get(`/posts/${id}/comments`).then((res) => {
      setComments(res.data);
    });
  };

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost>
        <Markdown>{data.text}</Markdown>
      </Post>
      <CommentsBlock items={comments} isLoading={false}>
        {isAuth && (
          <Index postId={data._id} onCommentAdded={handleCommentAdded} />
        )}
      </CommentsBlock>
    </>
  );
};
