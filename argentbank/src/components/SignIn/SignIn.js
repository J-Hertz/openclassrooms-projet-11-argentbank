import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { signInApi } from '../../services/userService';
import './signIn.css';

function SignIn() {
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function Authentification(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const forms = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const payload = JSON.stringify(forms);

    try {
      const token = await signInApi(payload);
      window.localStorage.setItem('token', token);
      setRedirect(true);
    } catch (error) {
      setErrorMessage('Identifiants incorrects');
    }
  }

  return (
    <div>
      {redirect && <Navigate to="/user" />}
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
