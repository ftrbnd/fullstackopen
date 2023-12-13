import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      state = action.payload;
      return state;
    },
    removeNotification(state) {
      state = '';
      return state;
    }
  }
});

export const { setNotification, removeNotification } = notificationSlice.actions;

export const displayNotification = (content, seconds = 3) => {
  return async (dispatch) => {
    dispatch(setNotification(content));

    console.log(content, seconds);

    setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
