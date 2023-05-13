import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ResetPassword } from "../services/authServices";
import { useNavigate, useParams } from "react-router-dom";

interface UpdatePasswordProps {
  setToken: (token: string) => void;
  setUser: (user: User) => void;
}

interface User {
  _id?: string;
  email: string;
}

const ResetPasswordPage: React.FC<UpdatePasswordProps> = ({
  setToken,
  setUser,
}) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const navigate = useNavigate();
  const { resetToken } = useParams<{ resetToken: string }>();
  const [error, setError] = useState<string>("");
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
    console.log("Handling submit");

    try {
      const passwordData = { password, passwordConfirm };
      if (resetToken) {
        const { token, user } = await ResetPassword(resetToken, passwordData);
        token && setToken(token);
        console.log("Login successful. Token:", token);
        setUser(user);
        console.log("User:", user);
        setConfirmPassword("");
        setPassword("");

        setPasswordChangeSuccess(true);
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError(error.message as string);
    }
  };

  const handleLogout = () => {
    navigate("/");
    setUser({ email: "" });
    setToken("");
  };

  const handleReturnToJokes = () => {
    navigate("/jokes");
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        {passwordChangeSuccess ? (
          <div>
            <div className="success-message">
              <p>Password changed successfully!</p>
            </div>
            <button className="update-button" onClick={handleLogout}>
              Logout
            </button>
            <button className="update-button" onClick={handleReturnToJokes}>
              Return to Jokes
            </button>
          </div>
        ) : (
          <>
            <h2>Enter a new password</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                className="login-input"
                type="password"
                id="password"
                placeholder="New Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <input
                className="login-input"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={handleConfirmPasswordChange}
              />
              <button className="login-button" type="submit">
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

export default ResetPasswordPage;
