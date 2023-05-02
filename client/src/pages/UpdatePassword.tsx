import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { updatePassword } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

interface UpdatePasswordProps {
  token: string;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
}

interface User {
  _id?: string;
  email: string;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ token, setToken, setUser }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');
  const [passwordCurrent, setCurrentConfirmPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentConfirmPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Handling submit');

    try {
      const passwordData = { passwordCurrent, password, passwordConfirm };
      const { newToken, user } = await updatePassword(token, passwordData);
      setToken(newToken);
      console.log('Login successful. Token:', newToken);
      setUser(user);
      console.log('User:', user);
      setConfirmPassword('');
      setPassword('');
      setCurrentConfirmPassword('');
      setPasswordChangeSuccess(true);
    } catch (error:any) {
      console.error('Login failed:', error.message);
      setError(error.message as string);
    }
  };

  const handleLogout = () => {
    navigate('/');
    setUser({ email: '' });
    setToken('');
  };

  const handleReturnToJokes = () => {
    navigate('/jokes')
  };

  return (
    <div>
      <Header />
      <div className='login-container'>
        
        {passwordChangeSuccess ? (
          <div>
            <div className='success-message'>
            <p>Password changed successfully!</p>
            </div>
            <button className='update-button' onClick={handleLogout}>
              Logout
            </button>
            <button className='update-button' onClick={handleReturnToJokes}>
              Return to Jokes
            </button>
          </div>
        ) : (
          <>
          <h2>Change your password</h2>
          {error && <p className="error-message">{error}</p>} 
          <form className='login-form' onSubmit={handleSubmit}>
            <input
              className='login-input'
              type='password'
              id='passwordCurrent'
              placeholder='Current Password'
              value={passwordCurrent}
              onChange={handleCurrentPasswordChange}
            />
            <input
              className='login-input'
              type='password'
              id='password'
              placeholder='New Password'
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              className='login-input'
              type='password'
              id='confirmPassword'
              placeholder='Confirm Password'
              value={passwordConfirm}
              onChange={handleConfirmPasswordChange}
            />
            <button className='login-button' type='submit'>
              Update
            </button>
          </form>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UpdatePassword;