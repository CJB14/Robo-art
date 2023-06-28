import React, { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    // TODO: Implement logout functionality
    // Clear user authentication state, remove tokens, etc.

    // Simulating logout by redirecting to the homepage after 2 seconds
    const timeout = setTimeout(() => {
      window.location.href = '/';
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="logout-page">
      <h2>Logout</h2>
      <p>Logging you out...</p>
    </div>
  );
};

export default LogoutPage;
