import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import JokePage from './pages/JokePage'
import ResetPasswordPage from './pages/ResetPasswordPage';
import './App.css';

interface User {
  _id?: string;
  email: string;
}

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User>({ email: '' });
  const isAuthenticated = token !== '';

  return (
   <BrowserRouter >
    <Routes>
        <Route path="/" element = {<LoginPage setToken={setToken} setUser={setUser} /> } />
        <Route path="/signup" element = {<SignIn setToken={setToken} setUser={setUser} />} />
        <Route path="/forgot-password"element = {<ForgotPassword />} />
        <Route path="/update-password"
         element={<UpdatePassword token={token} setToken={setToken} setUser={setUser} />} />
        <Route
          path="/jokes"
          element={<JokePage userEmail={user.email} isAuthenticated={isAuthenticated} />}
        />
         <Route path="/resetPassword/:resetToken" element={<ResetPasswordPage setToken={setToken} setUser={setUser} />}  />
    </Routes>
    </BrowserRouter> 
  );
}

export default App;