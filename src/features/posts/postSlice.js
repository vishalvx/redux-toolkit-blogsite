import {
  createSlice,
  nanoid,
  createAsymcThunk,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import { postsUrl } from "../../utils/Urls";

const POSTS_URL = postsUrl;

//post initial State
const initialState = {
  posts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    /**
     * /////////// NOTES /////////////
     * -> below fn will automatic create action as name as fn name
     * -> we can push in state bcz toolkit uses immer js under the hood
     *    we don't need to worry about spreading(...) the state but we can use push directly
     */
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      /**
       * prepare use for preparing payload we and return to reducer
       */
      prepare(title, content, authorId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            authorId,
            date: new Date().toISOString(),
            reactions: {
              thumpsup: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
            },
          },
        };
      },
    },
    addReaction: {
      reducer(state, action) {
        const { reaction, postId } = action.payload;
        const foundPost = state.posts.find((post) => post.id == postId);
        if (foundPost) {
          foundPost.reactions[reaction]++;
        }
      },
    },
  },
  //extraRducer
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        //add custum fields (date, reactions) in fetched data
        let minutes = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: minutes++ }).toISOString();
          post.reactions = {
            thumpsup: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
          };
          return post;
        });
        //adding in current state
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

//export selectors
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

//export Actions
export const { postAdded, addReaction } = postsSlice.actions;

//export reducer
export default postsSlice.reducer;
