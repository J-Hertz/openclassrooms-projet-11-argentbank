import './userHeader.css';

import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo, selectUserInfo } from '../../redux/userSlice';

function UserHeader() {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {userInfo.firstName} {userInfo.lastName}
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}

export default UserHeader;
