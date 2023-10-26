import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import AccountList from '../../containers/AccountList/AccountList';

function User() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (token) {
      const [header, payload, signature] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      const expirationDate = new Date(decodedPayload.exp * 1000);
      const currentDate = new Date();
      if (currentDate >= expirationDate) {
        navigate('/sign-in');
      }
    } else {
      navigate('/sign-in');
    }
  }, [token, navigate]);

  return (
    <main className="main bg-dark">
      <UserHeader />
      <AccountList />
    </main>
  );
}

export default User;
