import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authServices";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface User {
  _id?: string;
  email: string;
}

interface SignInProps {
  setToken: (token: string) => void;
  setUser: (user: User) => void;
}

const SignIn: React.FC<SignInProps> = ({ setToken, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Handling signing in");

    try {
      const userData = { email, password, passwordConfirm };
      const { token, user } = await signup(userData);
      setToken(token);
      console.log("Login successful. Token:", token);
      setUser(user);
      console.log("User:", user);
      navigate("/jokes");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Error:", error.message);
      setError(error.message as string);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
         <div className="login-input-visib-icon">
          <input
            className="login-input"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />

          <input
            className="login-input"
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {showPassword ? (
            <VisibilityOffIcon
              className="visib-icon-signin"
              onClick={handleTogglePassword}
            />
          ) : (
            <VisibilityIcon
              className="visib-icon-signin"
              onClick={handleTogglePassword}
            />
          )}
          <input
            className="login-input"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={handleConfirmPasswordChange}
          />
          {showConfirmPassword ? (
            <VisibilityOffIcon
              className="visib-icon-signin-confirm"
              onClick={handleToggleConfirmPassword}
            />
          ) : (
            <VisibilityIcon
              className="visib-icon-signin-confirm"
              onClick={handleToggleConfirmPassword}
            />
          )}
          </div>
          <button className="login-button" type="submit">
            Sign in
          </button>
          <p>
            <a className="login-link" href="/forgot-password">
              Forgot password?
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
