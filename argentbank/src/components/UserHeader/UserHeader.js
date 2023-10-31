import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo, selectUserInfo } from '../../redux/userSlice';
import EditUsernameForm from '../EditUserNameForm/EditUsernameForm';

function UserHeader() {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const [editUsername, setEditUsername] = useState(false);

  const handleEditClick = () => {
    setEditUsername(true);
  };

  return (
    <div className="header">
      {editUsername ? (
        <EditUsernameForm onClose={() => setEditUsername(false)} />
      ) : (
        <>
          <h1>
            Welcome back
            <br />
            {userInfo.firstName} {userInfo.lastName}
          </h1>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        </>
      )}
    </div>
  );
}

export default UserHeader;
