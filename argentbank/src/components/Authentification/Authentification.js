async function Authentification(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const forms = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const payload = JSON.stringify(forms);

  const response = await fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  });

  const data = await response.json();

  if (response.ok) {
    window.localStorage.setItem('token', data.body.token);
    const token = window.localStorage.getItem('token');
    console.log(token);
  } else {
    console.log("erreur d'authentification");
  }
}

export default Authentification;
