import React, { useState, useEffect } from 'react';
import Login from './Login';
import Map from './utils/Map';
import './App.css';

function Navbar({ tokens }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        MilitaryChief
      </div>
      <div className="navbar-right">
        Credits: {tokens}
      </div>
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if (userToken && userToken.email) {
      setIsLoggedIn(true);
      fetchTokens(userToken.email);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const userToken = JSON.parse(localStorage.getItem('userToken'));
      fetchTokens(userToken.email);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    fetchTokens(userToken.email);
  };

  const fetchTokens = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/credits/${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        setTokens(data.credits);
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Navbar tokens={tokens} />
          <Map />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
