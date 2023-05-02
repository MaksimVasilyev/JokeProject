import React, { useState } from 'react';
import Footer  from '../components/Footer';
import Header from '../components/Header';
import { forgotPassword } from '../services/authServices';
import { useNavigate } from 'react-router-dom';


const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };

      const handleSubmitSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Handling submit')
    
        try {
          
         const response= await forgotPassword(email);
          
         console.log(response)
  
          
        } catch (error:any) {
          console.error('Login failed:', error.message);
          setError(error.message as string);
        }
       
      };
     
      const handleSubmitCancel = () => navigate('/');

    return (
      <div>
      <Header />
      <div className='forgotpass-container'>
        <div className='forgotpass-heading'>
        <h1>Find your account</h1>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className='forgotpass-inpput-container'>
        <p>Please enter your email to search for your account.</p>
        <input className='forgotpass-input' type="email" id="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        </div>
        <div className='forgotpass-buttons-container'>
        <button  className='forgotpass-button-cancel' type="submit"  onClick={handleSubmitCancel}>Cancel</button>
        <button  className='forgotpass-button-submit' type="submit" onClick={handleSubmitSearch}>Search</button>
        
        </div>
      </div>
      <Footer />
     </div>  
    )

}

export default ForgotPassword;