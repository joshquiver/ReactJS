import React from 'react';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
        console.log('Attempting logout...');
      const response = await fetch('http://localhost:8081/api/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials for cross-origin requests with sessions
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Logout was successful
        console.log('Logout successful');
        // You may want to redirect the user to the login page or perform other actions
      } else {
        // Logout failed
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
