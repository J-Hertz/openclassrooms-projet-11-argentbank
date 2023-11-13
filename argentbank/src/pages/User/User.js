import UserHeader from '../../components/UserHeader/UserHeader';
import AccountList from '../../containers/AccountList/AccountList';
import { validateTokenService } from '../../services/userService';

function User() {
  if (!validateTokenService()) {
    window.location = '/';
    localStorage.clear();
  } else {
    return (
      <main className="main bg-dark">
        <UserHeader />
        <AccountList />
      </main>
    );
  }
}

export default User;
