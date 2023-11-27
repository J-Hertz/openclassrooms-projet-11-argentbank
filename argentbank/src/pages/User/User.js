import UserHeader from '../../components/UserHeader/UserHeader';
import AccountList from '../../containers/AccountList/AccountList';

function User() {
  return (
    <main className="main bg-dark">
      <UserHeader />
      <AccountList />
    </main>
  );
}

export default User;
