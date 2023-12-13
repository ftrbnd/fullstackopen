import { createSlice } from '@reduxjs/toolkit';
import { addComment, createBlog, deleteBlog, getAllBlogs, updateBlog } from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(_state, action) {
      return action.payload;
    },
    editBlog(state, action) {
      return state.map((blog) => (blog.id === action.payload.id ? action.payload : blog));
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    }
  }
});

export const { appendBlog, setBlogs, editBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAllBlogs();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await createBlog(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await updateBlog({
      ...blog,
      likes: blog.likes + 1
    });

    dispatch(editBlog(newBlog));
  };
};

export const deleteThisBlog = (blog) => {
  return async (dispatch) => {
    await deleteBlog(blog);

    dispatch(removeBlog(blog));
  };
};

export const commentOnBlog = (blog, comment) => {
  return async (dispatch) => {
    const newBlog = await addComment(blog, comment);

    dispatch(editBlog(newBlog));
  };
};

export default blogSlice.reducer;
