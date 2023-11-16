export const fetchUserInfoApi = async (token) => {
  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.body;
  } else {
    throw new Error('Failed to fetch user data');
  }
};

export const updateUserNameApi = async (token, newUserName) => {
  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName: newUserName }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.body;
  } else {
    throw new Error('Failed to update username');
  }
};

export const signInApi = async (payload, setRedirect) => {
  const response = await fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  });

  const data = await response.json();

  if (response.ok) {
    return data.body.token;
  } else {
    throw new Error("Erreur d'authentification");
  }
};
