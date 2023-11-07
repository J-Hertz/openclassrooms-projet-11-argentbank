export const fetchUserInfoService = async (token) => {
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

export const updateUserNameService = async (token, newUserName) => {
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
    return data.body; // Utilisez data.body pour extraire les données
  } else {
    throw new Error('Failed to update username');
  }
};
export const signInService = async (payload, setRedirect) => {
  const response = await fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  });

  const data = await response.json();

  if (response.ok) {
    window.localStorage.setItem('token', data.body.token);
    const token = window.localStorage.getItem('token');
    setRedirect(true);
  } else {
    console.log("erreur d'authentification");
  }
};
