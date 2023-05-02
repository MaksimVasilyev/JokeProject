import React from "react";

function Footer():JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Maksim Vasilyev {year}</p>
    </footer>
  );
}

export default Footer;