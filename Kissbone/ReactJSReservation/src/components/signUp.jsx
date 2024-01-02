// SignUpForm.js
/*
import React, { useState, useEffect } from 'react';
import './signUp.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    contactNo: '',
    position: '',
  });

  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  useEffect(() => {
    // Fetch accounts data when the component mounts
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:8081/accounts');
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8081/Update_accounts/${selectedAccountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Handle the response as needed
      const data = await response.json();
      console.log('Account updated:', data);
  
      // Update the accounts state after successful update
      setAccounts(accounts.map((account) => (account.id === selectedAccountId ? formData : account)));
  
      // Clear the form after successful update
      setFormData({
        name: '',
        username: '',
        password: '',
        contactNo: '',
        position: '',
      });
  
      // Reset the selected account ID
      setSelectedAccountId(null);
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  const handleDelete = async (accountId) => {
    try {
      const response = await fetch(`http://localhost:8081/accounts/${accountId}`, {
        method: 'DELETE',
      });
  
      // Handle the response as needed
      const data = await response.json();
      console.log('Account deleted:', data);
  
      // Update the accounts state after deletion
      setAccounts(accounts.filter((account) => account.id !== accountId));
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };




  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have an API endpoint for handling sign-up on the server
    try {
      const response = await fetch('http://localhost:8081/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed
      const data = await response.json();
      console.log('Sign-up successful:', data);

      // Clear the form after successful signup
      setFormData({
        name: '',
        username: '',
        password: '',
        contactNo: '',
        position: '',
      });
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div>
    <form className="sign-up-form" onSubmit={handleSubmit}>
    <label>
        Account ID:
        <input 
          type="text" 
          name="account_id" 
          value={formData.account_id} 
          onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
        />
        </label>
     <label>
        Name:
        <input type="text" name="name" value={formData.Name} onChange={handleChange} />
      </label>

      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>

      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>

      <label>
        Contact Number:
        <input type="text" name="contactNo" value={formData.contact_no} onChange={handleChange} />
      </label>

      <label>
        Position:
        <input type="text" name="position" value={formData.position} onChange={handleChange} />
      </label>

      <button type="submit">Sign Up</button>
    </form>
    <table className="accounts-table">
    <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Contact Number</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
    <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.account_id}</td>
              <td>{account.Name}</td>
              <td>{account.username}</td>
              <td>{account.contact_no}</td>
              <td>{account.position}</td>
              <td>
                <button onClick={() => handleUpdate(account.id)}>Update</button>
                <button onClick={() => handleDelete(account.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SignUpForm;
*/

/*
import React, { useState, useEffect } from 'react';
import './signUp.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    account_id: '',
    name: '',
    username: '',
    password: '',
    contactNo: '',
    position: '',
  });

  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  useEffect(() => {
    // Fetch accounts data when the component mounts
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:8081/accounts');
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8081/Update_accounts/${selectedAccountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed
      const data = await response.json();
      console.log('Account updated:', data);

      // Update the accounts state after successful update
      setAccounts(accounts.map((account) => (account.id === selectedAccountId ? formData : account)));

      // Clear the form after successful update
      setFormData({
        account_id: '',
        name: '',
        username: '',
        password: '',
        contactNo: '',
        position: '',
      });

  
      // Reset the selected account ID
      setSelectedAccountId(null);
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  const handleDelete = async (accountId) => {
    try {
      const response = await fetch(`http://localhost:8081/accounts/${accountId}`, {
        method: 'DELETE',
      });

      // Handle the response as needed
      const data = await response.json();
      console.log('Account deleted:', data);

      // Update the accounts state after deletion
      setAccounts(accounts.filter((account) => account.id !== accountId));
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };


  const handleRowClick = (account) => {
    setSelectedAccountId(account.id);
    setFormData({
      account_id: account.account_id,
      Name: account.Name,
      username: account.username,
      password: '', // Password is not included for security reasons; you can modify this if needed
      contact_no: account.contact_no,
      position: account.position,
    });
  };




  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have an API endpoint for handling sign-up on the server
    try {
      const response = await fetch('http://localhost:8081/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed
      const data = await response.json();
      console.log('Sign-up successful:', data);

      // Clear the form after successful signup
      setFormData({
        name: '',
        username: '',
        password: '',
        contactNo: '',
        position: '',
      });
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div>
    <form className="sign-up-form" onSubmit={handleSubmit}>
    <label>
        Account ID:
        <input 
          type="text" 
          name="account_id" 
          value={formData.account_id} readOnly
          onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
        />
        </label>
     <label>
        Name:
        <input type="text" name="name" value={formData.Name} onChange={handleChange} />
      </label>

      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>

      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>

      <label>
        Contact Number:
        <input type="text" name="contactNo" value={formData.contact_no} onChange={handleChange} />
      </label>

      <label>
        Position:
        <input type="text" name="position" value={formData.position} onChange={handleChange} />
      </label>

      <button type="submit">Sign Up</button>
    </form>
    <table className="accounts-table">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Contact Number</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
    <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.account_id}</td>
              <td>{account.Name}</td>
              <td>{account.username}</td>
              <td>{account.contact_no}</td>
              <td>{account.position}</td>
              <td>
                <button onClick={() => handleUpdate(account.id)}>Update</button>
                <button onClick={() => handleDelete(account.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SignUpForm;
*/

// src/App.js
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './signUp.css';

const SignUpForm = ({ onSignUpComplete }) => {
  const [accountId, setAccountId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [position, setPosition] = useState('');

  const [accounts, setAccounts] = useState([]);

  const handleSignUp = async () => {
    const hashedPassword = hashFunction(password);

    try {
      await axios.post('http://localhost:8081/signup', {
        account_id: accountId,
        name,
        username,
        password: hashedPassword,
        contact_no: contactNo,
        position,
      });

      fetchAccounts();
      getMaxAccountId();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleDelete = async (accountId) => {
    try {
      await axios.delete(`http://localhost:8081/accounts/${accountId}`);
      fetchAccounts();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleUpdate = async () => {
    const hashedPassword = hashFunction(password);

    try {
      await axios.put(`http://localhost:8081/api/accounts/${accountId}`, {
        name,
        username,
        password: hashedPassword,
        contact_no: contactNo,
        position,
      });

      fetchAccounts();
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/accounts');
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const getMaxAccountId = async () => {
    try {
      const response = await axios.get('http://localhost:8081/accountsGetID');
      setAccountId(response.data.maxAccountId);
    } catch (error) {
      console.error('Error fetching max account ID:', error);
    }
  };

  useEffect(() => {
    fetchAccounts();
    getMaxAccountId();
  }, []);

  
  const clearForm = () => {
    setAccountId('');
    setName('');
    setUsername('');
    setPassword('');
    setContactNo('');
    setPosition('');
  };

  const handleAccountSelection = (selectedAccount) => {
    setAccountId(selectedAccount.account_id);
    setName(selectedAccount.name);
    setUsername(selectedAccount.username);
    setContactNo(selectedAccount.contact_no);
    setPosition(selectedAccount.position);
  };

  const hashFunction = (str) => {
    // Implement your password hashing logic here
    return str;
  };

  return (
    <div className="sign-up-container">
      <div className="form-container">
        <form className="sign-up-form">
        <label>Account ID:</label>
        <input type="text" value={accountId} readOnly />
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Contact No:</label>
        <input type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
        <label>Position:</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />

        <button type="button" onClick={() => { handleSignUp(); onSignUpComplete(); }}>
            Sign Up
          </button>
      </form>


      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Contact No</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.account_id}>
              <td>{account.account_id}</td>
              <td>{account.Name}</td>
              <td>{account.username}</td>
              <td>{account.password}</td>
              <td>{account.contact_no}</td>
              <td>{account.position}</td>
              <td>
                <button type="button" onClick={() => handleDelete(account.account_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
    </div>
  );
};

export default SignUpForm;
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './signUp.css';

const SignUpForm = ({ onSignUpComplete }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [position, setPosition] = useState('');

  const handleSignUp = async () => {
    const hashedPassword = hashFunction(password);

    try {
      await axios.post('http://localhost:8081/signup', {
        name,
        username,
        password: hashedPassword,
        contactNo,
        position,
      });

      onSignUpComplete();
    } catch (error) {
      console.error('Error signing up:', error.response.data);
    }
  };

  const hashFunction = (str) => {
    // Implement your password hashing logic here
    return str;
  };

  return (
    <div className="sign-up-container">
      <div className="form-container">
        <form className="sign-up-form">
          <h1 className='h'>Sign Up</h1>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Contact No:</label>
          <input type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
          <label>Position:</label>
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />

          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
