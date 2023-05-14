import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import UserHeader from "../components/UserHeader";
import { fetchJoke } from "../services/contentServices";

interface JokePageProps {
  userEmail: string;
  isAuthenticated: boolean;
}

const JokePage: React.FC<JokePageProps> = ({ userEmail, isAuthenticated }) => {
  const [joke, setJoke] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redirect to the login page if not authenticated
    } else {
      fetchJokeAndSet();
    }
  }, [isAuthenticated, navigate]);

  const fetchJokeAndSet = async () => {
    try {
      const jokeData = await fetchJoke();
      setJoke(jokeData);
    } catch (error) {
      // Handle error
    }
  };

  const handleClick = async () => {
    fetchJokeAndSet();
  };

  return (
    <div>
      <UserHeader userEmail={userEmail} />
      <div className="joke-container">
        <h3>{joke}</h3>
        <button onClick={handleClick} className="joke-button" type="button">
          Get another
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default JokePage;
