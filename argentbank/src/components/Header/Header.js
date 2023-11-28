import argentBankLogo from '../../assets/img/argentBankLogo.png';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo, selectUserInfo } from '../../redux/userSlice';

function Header() {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch]);

  const handleSignOut = () => {
    localStorage.clear();
    window.location = '/';
  };

  const token = localStorage.getItem('token');
  if (token) {
    return (
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className="displayFlex">
          <div className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} />
            <Link to="/user">{userInfo.userName}</Link>
          </div>
          <Link className="main-nav-logo" to="/" onClick={handleSignOut}>
            <div className="main-nav-item">
              <FontAwesomeIcon icon={faRightFromBracket} />
              Sign Out
            </div>
          </Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link to="/sign-in" className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        </div>
      </nav>
    );
  }
}
export default Header;
