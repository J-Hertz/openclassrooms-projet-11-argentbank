import axios from 'axios';

axios.interceptors.response.use(
  (response) => {
    console.log('toto');
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export const fetchUserInfoApi = async (token) => {
  const response = await axios
    .post(
      'http://localhost:3001/api/v1/user/profile',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .catch((error) => {
      console.log('error');
    });

  return response.data.body;
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
