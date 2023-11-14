import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserInfoService,
  updateUserNameService,
} from '../services/userService';

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

export const fetchUserInfo = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const userInfo = await fetchUserInfoService(token);
    dispatch(fetchUserInfoSuccess(userInfo));
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    window.location = '/';
    localStorage.clear();
  }
};

export const updateUserName = (newUserName) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location = '/';
    }

    const updatedUserInfo = await updateUserNameService(token, newUserName);
    dispatch(updateUserNameSuccess(updatedUserInfo));
  } catch (error) {
    console.error('Failed to update username:', error);
    window.location = '/';
    localStorage.clear();
  }
};

export default userSlice.reducer;
