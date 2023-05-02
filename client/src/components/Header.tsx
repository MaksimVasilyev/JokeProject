import React from "react";
import jesterIcon from '../icons/jester3.png';

function Header() {
  return (
    <header>
      <div className="header-container">
      <h1>
      <img src={jesterIcon} alt="Jester Icon" />
      JokeBox
      </h1>
      </div>
    </header>
  );
}

export default Header;