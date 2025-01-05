import { FaBookOpenReader } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">
          <FaBookOpenReader />
        </span>
        <span className="logo-text">ReadEzy</span>
      </div>
      <nav className="navbar">
        <Link
          to="/"
          className={`nav-link ${activeLink === "/" ? "active" : ""}`}
          onClick={() => handleLinkClick("/")}
        >
          Home
        </Link>
        <Link
          to="/Reading-tool"
          className={`nav-link ${
            activeLink === "/Reading-tool" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/Reading-tool")}
        >
          Reading Tool
        </Link>
        <Link
          to="/Speaking-tool"
          className={`nav-link ${
            activeLink === "/Speaking-tool" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/Speaking-tool")}
        >
          Speaking Tool
        </Link>
        <Link
          to="/Listening-tool"
          className={`nav-link ${
            activeLink === "/Listening-tool" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/Listening-tool")}
        >
          Listening Tool
        </Link>
        <Link
          to="/Translator-tool"
          className={`nav-link ${
            activeLink === "/Translator-tool" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/Translator-tool")}
        >
          Translation
        </Link>
      </nav>
    </header>
  );
};

export default Header;
