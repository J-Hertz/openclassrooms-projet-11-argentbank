import axios from 'axios';
import axiosInterceptor from '../interceptor/interceptor';

axiosInterceptor();

export const fetchUserInfoApi = async (token) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/user/profile',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.body;
  } catch (error) {
    console.log('Error fetching user info:', error);
    throw new Error('Failed to fetch user info');
  }
};

export const updateUserNameApi = async (token, newUserName) => {
  try {
    const response = await axios.put(
      'http://localhost:3001/api/v1/user/profile',
      { userName: newUserName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.body;
  } catch (error) {
    return Promise.reject(error);
    // throw new Error('Failed to update username');
  }
};

export const signInApi = async (payload, setRedirect) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/user/login',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data.body.token;
  } catch (error) {
    return Promise.reject(error);
    // throw new Error('Authentification error');
  }
};
