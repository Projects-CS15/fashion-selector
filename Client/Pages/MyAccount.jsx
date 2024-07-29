import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';
import '../styles/MyAccount.css';

const MyAccount = () => {
  const { user, session, login, loading } = useAuth();
  const [first_name, setFirstName] = useState(user?.user_metadata?.first_name || '');
  const [last_name, setLastName] = useState(user?.user_metadata?.last_name || '');
  const [email, setEmail] = useState(user?.user_metadata?.email || '');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const [editField, setEditField] = useState(null);

  const handleFieldUpdate = async (field, value) => {
    try {
      await axios.post(`/api/update-profile`, {
        userId: user.id,
        field,
        value,
      });

      // Fetch updated user data after profile update
      const updatedUser = await fetchUpdatedUserInfo();
      if (updatedUser) {
        // Update AuthContext with the new user data
        login(updatedUser, session);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
    setEditField(null);
  };

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'first_name') setFirstName(value);
    if (name === 'last_name') setLastName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const fetchUpdatedUserInfo = async () => {
    try {
      const response = await axios.get(`/api/user-profile/${user.id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching updated user info:', error);
    }
  };

  const handleAvatarUpload = async () => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('userId', user.id); // Include user ID in the form data

    try {
      await axios.post('/api/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUser = await fetchUpdatedUserInfo();
      if (updatedUser) {
        login(updatedUser, session);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <div className="account-container">
      <h1>My Account</h1>
      <div className="account-field">
        <div>
          <span>First Name: {first_name}</span>
          <button onClick={() => handleEditClick('first_name')}>Update</button>
        </div>
        {editField === 'first_name' && (
          <input
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleInputChange}
            onBlur={() => handleFieldUpdate('first_name', first_name)}
          />
        )}
      </div>
      <div className="account-field">
        <div>
          <span>Last Name: {last_name}</span>
          <button onClick={() => handleEditClick('last_name')}>Update</button>
        </div>
        {editField === 'last_name' && (
          <input
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleInputChange}
            onBlur={() => handleFieldUpdate('last_name', last_name)}
          />
        )}
      </div>
      <div className="account-field">
        <div>
          <span>Email: {email}</span>
          <button onClick={() => handleEditClick('email')}>Update</button>
        </div>
        {editField === 'email' && (
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            onBlur={() => handleFieldUpdate('email', email)}
          />
        )}
      </div>
      <div className="account-field">
        <div>
          <span>Password: ******</span>
          <button onClick={() => handleEditClick('password')}>Update</button>
        </div>
        {editField === 'password' && (
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            onBlur={() => handleFieldUpdate('password', password)}
          />
        )}
      </div>
      <div className="account-field">
        <div>
          <span>Avatar:</span>
          <input type="file" onChange={handleAvatarChange} />
          <button type="button" onClick={handleAvatarUpload}>Upload Avatar</button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
