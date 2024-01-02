
/*
import React, { useState } from 'react';
import LoginForm from './components/logIn';
import Reservation from './components/reservation';
import Orders from './components/Orders';
import Settings from './components/Setting';
//import './App.css';
import './Navbar.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('Reservation'); // Set the default component to 'Reservation'

  const handleLogin = (values) => {
    // Simulate a login process, replace with actual authentication logic
    if (values.username === 'user' && values.password === '123') {
      setLoggedIn(true);
      setUsername(values.username);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  const handleNavigation = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <nav>
            <ul>
              <div className='button_container'>
              <li><button className= 'reservation' onClick={() => handleNavigation('Reservation')}> RESERVATION </button></li>
              <li><button className= 'customers' onClick={() => handleNavigation('Orders')}>CUSTOMERS</button></li>
              <li><button className= 'admin' onClick={() => handleNavigation('Settings')}>ADMINISTRATOR</button></li>
              <li><button className= 'logout' onClick={handleLogout}>LOG OUT</button></li>
              </div>
            </ul>
          </nav>
       
          {selectedComponent === 'Reservation' && <Reservation username={username} />}
          {selectedComponent === 'Orders' && <Orders />}
          {selectedComponent === 'Settings' && <Settings />}
        </div>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
};

export default App;
*/

/*
import React, { useState } from 'react';
import LoginForm from './components/logIn';
import Reservation from './components/reservation';
import Orders from './components/Orders';
import Settings from './components/Setting';
import SignUp from './components/signUp'; // Import SignUp component
import './Navbar.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('Reservation');

  const [isSignUpClicked, setIsSignUpClicked] = useState(false); // Add state

 
 


  const handleLogin = async (values) => {
    try {
      const response = await fetch('http://localhost:8081/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setLoggedIn(true);
          setUsername(values.username);
        } else {
          alert('Invalid credentials');
        }
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  const handleNavigation = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <nav>
            <ul>
              <div className='button_container'>
                <li><button className='reservation' onClick={() => handleNavigation('Reservation')}> RESERVATION </button></li>
                <li><button className='customers' onClick={() => handleNavigation('Orders')}>CUSTOMERS</button></li>
                <li><button className='admin' onClick={() => handleNavigation('Settings')}>FOODS AND ROOMS</button></li>
             
                <li><button className='signUp' onClick={() => handleNavigation('SignUp')}>SIGN UP</button></li>            
                
                <li><button onClick={handleLogout}>LOG OUT</button></li>
              </div>
            </ul>
          </nav>

          {selectedComponent === 'Reservation' && <Reservation username={username} />}
          {selectedComponent === 'Orders' && <Orders />}
          {selectedComponent === 'Settings' && <Settings />}
          {selectedComponent === 'SignUp' && <SignUp />} 
        </div>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
};

export default App;
*/



import React, { useState } from 'react';
import LoginForm from './components/logIn';
import Reservation from './components/reservation';
import Orders from './components/Orders';
import Settings from './components/Setting';
import './Navbar.css';
import SignUpForm from './components/signUp';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('Reservation');
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
 


  const handleLogin = async (values) => {
    try {
      const response = await fetch('http://localhost:8081/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setLoggedIn(true);
          setUsername(values.username);
        } else {
          alert('Invalid credentials');
        }
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  const handleNavigation = (component) => {
    setSelectedComponent(component);
  };



  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
  };



  return (
    <div>
      {loggedIn ? (
        <div>
          <nav>
            <ul>
              <div className='button_container'>
                <li><button className='reservation' onClick={() => handleNavigation('Reservation')}> RESERVATION </button></li>
                <li><button className='customers' onClick={() => handleNavigation('Orders')}>CUSTOMERS</button></li>
                <li><button className='admin' onClick={() => handleNavigation('Settings')}>FOODS AND ROOMS</button></li>


                <li><button onClick={handleLogout}>LOG OUT</button></li>
              </div>
            </ul>
          </nav>

          {selectedComponent === 'Reservation' && <Reservation username={username} />}
          {selectedComponent === 'Orders' && <Orders />}
          {selectedComponent === 'Settings' && <Settings />}
        </div>
      ) : (
        <>
          {isSignUpClicked ? (
            <SignUpForm
              onSignUpComplete={() => {
                setIsSignUpClicked(false);
                // Additional logic to handle sign-up completion if needed
              }}
            />
          ) : (
            <LoginForm onSubmit={handleLogin} onSignUpClick={handleSignUpClick} />
          )}
        </>
      )}
    </div>
  );
};

export default App;