import argentBankLogo from '../../assets/img/argentBankLogo.png';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo, selectUserInfo } from '../../redux/userSlice';
import { validateTokenService } from '../../services/userService';

function Header() {
  const location = useLocation();

  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleSignOut = () => {
    localStorage.clear();
    window.location = '/';
  };

  if (validateTokenService()) {
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
