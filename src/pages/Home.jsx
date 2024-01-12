import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import {
  fetchPostsNew,
  fetchPostsPopular,
  fetchTags,
} from "../redux/slices/postsSlice";

export const Home = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);

  const { posts, tags } = useSelector((state) => state.posts);

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  const [order, setOrder] = React.useState("new");

  React.useEffect(() => {
    order === "new" ? dispatch(fetchPostsNew()) : dispatch(fetchPostsPopular());

    dispatch(fetchTags());
  }, [order]);

  const handleTabChange = (event, newValue) => {
    setOrder(newValue);
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        onChange={handleTabChange}
        aria-label="basic tabs example">
        <Tab label="New" value="new" />
        <Tab label="Popular" value="popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostLoading ? (
              <Post isLoading={true} key={index} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.user.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
