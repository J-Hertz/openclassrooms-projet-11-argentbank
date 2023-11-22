import UserHeader from '../../components/UserHeader/UserHeader';
import AccountList from '../../containers/AccountList/AccountList';

function User() {
  const validateToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const tokenParts = token.split('.');

    if (tokenParts.length !== 3) {
      return false;
    }

    const payload = JSON.parse(atob(tokenParts[1]));

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTimestamp) {
      return false;
    }

    return true;
  };

  if (validateToken()) {
    return (
      <main className="main bg-dark">
        <UserHeader />
        <AccountList />
      </main>
    );
  } else {
    localStorage.clear();
    window.location = '/sign-in';
  }
}

export default User;
