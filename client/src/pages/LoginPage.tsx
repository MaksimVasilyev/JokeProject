import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { login } from "../services/authServices";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface User {
  _id?: string;
  email: string;
}

interface LoginPageProps {
  setToken: (token: string) => void;
  setUser: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setToken, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Handling submit");

    try {
      const credentials = { email, password };
      const { token, user } = await login(credentials);
      setToken(token);
      console.log("Login successful. Token:", token);
      setUser(user);
      console.log("User:", user);
      navigate("/jokes");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError(error.message as string);
    }
  };

  const handleCreateNew = () => {
    navigate("/signup");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="login-input-visib-icon">
            <input
              className="login-input password-input"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {showPassword ? (
              <VisibilityOffIcon
                className="visib-icon-login"
                onClick={handleTogglePassword}
              />
            ) : (
              <VisibilityIcon
                className="visib-icon-login"
                onClick={handleTogglePassword}
              />
            )}
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          <p>
            <a
              className="login-link"
              href="/forgot-password"
              onClick={handleForgotPasswordClick}
            >
              Forgot password?
            </a>
          </p>
        </form>

        {error && <p className="error-message">{error}</p>}

        <button
          onClick={handleCreateNew}
          className="create-button"
          type="submit"
        >
          Create new account
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
