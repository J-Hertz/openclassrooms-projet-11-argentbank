import './signIn.css';

import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function SignIn() {
  const [redirect, setRedirect] = useState(false);

  async function Authentification(e) {
    console.log('toto1');
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
      console.log('navigate');
      setRedirect(true);
    } else {
      console.log("erreur d'authentification");
    }
  }

  return (
    <div>
      {redirect && <Navigate to="/user" />}
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        <form onSubmit={Authentification}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="email" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </div>
  );
}

export default SignIn;
