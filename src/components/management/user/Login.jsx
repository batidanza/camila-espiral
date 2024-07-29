import React, { useState, useEffect, createContext, useContext } from 'react';
import { loginUser } from '../../../services/fetchUsers';
import { Navigate } from 'react-router-dom';
import CustomTextInput from '../FormComponents/CustomTextInput';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setLoggedIn(true);
    }
  }, []);

  const login = async (username, password, setError) => {
    try {
      const response = await loginUser(username, password);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      setCurrentUser(response.user);
      setLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


const Login = () => {
  const { loggedIn, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    login(username, password, setError);
  };

  if (loggedIn) {
    return <Navigate to="/management" />;
  }

  return (
    <div className='my-container-form'>
      <h2 className="my-label-form">Login</h2>
      {error && <p>{error}</p>}
      <CustomTextInput
        className='my-input-form'
        placeholder="Username"
        value={username}
        onChange={setUsername}
      />
      <CustomTextInput
        className='my-input-form'
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      <button className='my-button-form' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
