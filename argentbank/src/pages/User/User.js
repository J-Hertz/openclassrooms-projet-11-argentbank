import UserHeader from '../../components/UserHeader/UserHeader';
import AccountList from '../../containers/AccountList/AccountList';

function User() {
  const token = window.localStorage.getItem('token');

  if (token) {
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
