import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div class="hero">
      <div class="hero-content">
        <h1>Introduction to ReadEzy</h1>
        <p>
          ReadEzy is a simple and helpful tool for anyone who struggles with
          reading English. It translates text between English and Hindi, making
          it easier to understand. You can also speak your text, and it will
          convert it to written form. Plus, it reads the translation out loud
          for you. It’s perfect for anyone who wants to learn or communicate
          better.
        </p>
        <div class="hero-buttons">
          <Link to="/Reading-tool" class="tool-button">
            Let's Start
          </Link>
        </div>
      </div>
      <div class="hero-image">
        <img src="image/ReadEzy.jpg" alt="Hero Image" />
      </div>
    </div>
  );
};

export default HeroSection;
