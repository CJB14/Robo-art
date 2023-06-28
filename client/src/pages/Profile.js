import React from 'react';

const ProfilePage = ({ user }) => {
  return (
    <div className="profile-page">
      <h2>Welcome, {user.name}!</h2>
      <div className="user-details">
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Username:</strong> {user.username}
        </div>
        {/* Add more user details as needed */}
      </div>
      <div className="profile-actions">
        <button>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
