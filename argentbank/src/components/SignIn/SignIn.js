import './signIn.css';
import Authentification from '../Authentification/Authentification';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function SignIn() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (token) {
        const [header, payload, signature] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        const expirationDate = new Date(decodedPayload.exp * 1000);
        const currentDate = new Date();
        if (currentDate < expirationDate) {
          navigate('/user');
          console.log(token);
        }
      }
    } catch (error) {
      console.error('token invalide', error);
    }
  }, [token, navigate]);

  return (
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
  );
}

export default SignIn;
