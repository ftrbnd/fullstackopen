import { createSlice } from '@reduxjs/toolkit';
import { login } from '../services/login';
import { setToken } from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      state = action.payload;
      return state;
    }
  }
});

export const { setUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('bloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      setToken(user.token);
    }
  };
};

export const logInUser = (user) => {
  return async (dispatch) => {
    const loggedUser = await login(user);

    localStorage.setItem('bloglistUser', JSON.stringify(loggedUser));
    dispatch(setUser(loggedUser));
    setToken(loggedUser.token);
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('bloglistUser');
    dispatch(setUser(null));
    setToken(null);
  };
};

export default userSlice.reducer;
