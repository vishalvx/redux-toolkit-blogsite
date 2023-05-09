import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

//post initial State
const initialState = [
  {
    id: "1",
    title: "learning video",
    content:
      "Now we can use the React-Redux hooks to let React components interact with the Redux store. We can read data from the store with useSelector",
    authorId: "1",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumpsup: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
    },
  },
  {
    id: "2",
    title: "new video",
    content:
      " dispatch actions using useDispatch. Create a component inside, then import that component into App.js and render it inside of <App>.",
    authorId: "1",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumpsup: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
    },
  },
];

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
        state.push(action.payload);
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
        const foundPost = state.find((post) => post.id == postId);
        if (foundPost) {
          foundPost.reactions[reaction]++;
        }
      },
    },
  },
});

//export selectors
export const selectAllPosts = (state) => state.posts;

//export Actions
export const { postAdded, addReaction } = postsSlice.actions;

//export reducer
export default postsSlice.reducer;
