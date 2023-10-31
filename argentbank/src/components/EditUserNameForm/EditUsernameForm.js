import React, { useState } from 'react';
import { useEffect } from 'react';
import './editUsernameForm.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserInfo,
  selectUserInfo,
  updateUserName,
} from '../../redux/userSlice';

function EditUsernameForm({ onClose }) {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const [newUsername, setNewUsername] = useState('');

  const handleSave = async () => {
    try {
      await dispatch(updateUserName(newUsername));
      onClose(); // Fermez le formulaire une fois la mise à jour terminée
    } catch (error) {
      console.error('Failed to update username', error);
      // Gérez les erreurs, par exemple, affichez un message à l'utilisateur
    }
  };

  return (
    <div className="edit-form">
      <div className="form-input-label-container">
        <label htmlFor="username" className="label-form">
          User name:
        </label>
        <input
          type="text"
          placeholder={userInfo.userName}
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div className="form-input-label-container">
        <label htmlFor="firstName" className="label-form">
          First name:
        </label>
        <input type="text" placeholder={userInfo.firstName} disabled />
      </div>
      <div className="form-input-label-container">
        <label htmlFor="lastName" className="label-form">
          Last name:
        </label>
        <input type="text" placeholder={userInfo.lastName} disabled />
      </div>
      <div className="form-button-container">
        <button className="form-button" onClick={handleSave}>
          Save
        </button>
        <button className="form-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditUsernameForm;
