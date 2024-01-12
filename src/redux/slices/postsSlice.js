import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPostsPopular = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const { data } = await axios.get("/posts/popular");
    return data;
  }
);

export const fetchPostsNew = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts/new");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => axios.delete(`/posts/${id}`)
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    // Получение статей
    [fetchPostsNew.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPostsNew.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsNew.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    [fetchPostsPopular.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPostsPopular.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsPopular.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    //Получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },

    //Удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const postReducer = postsSlice.reducer;
