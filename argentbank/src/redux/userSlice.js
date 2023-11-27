import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfoApi, updateUserNameApi } from '../services/userService';

const initialState = {
  user: {
    id: '',
    email: '',
    userName: '',
    firstName: '',
    lastName: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserInfoSuccess: (state, action) => {
      state.user = action.payload;
    },
    updateUserNameSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { fetchUserInfoSuccess, updateUserNameSuccess } =
  userSlice.actions;

export const selectUserInfo = (state) => state.user.user;

export const fetchUserInfo = () => (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const pathname = window.location.pathname;
    if (pathname == '/sign-in') {
      return;
    }

    const userInfo = fetchUserInfoApi(token);
    dispatch(fetchUserInfoSuccess(userInfo));
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

export const updateUserName = (newUserName) => async (dispatch) => {
  const token = localStorage.getItem('token');

  const updatedUserInfo = await updateUserNameApi(token, newUserName);
  dispatch(updateUserNameSuccess(updatedUserInfo));
};

export default userSlice.reducer;
