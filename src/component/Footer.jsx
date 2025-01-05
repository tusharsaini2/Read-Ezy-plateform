const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer class="footer">
      <div class="footer-links">
        <a href="#" class="footer-link">
          Home
        </a>
        <a href="#" class="footer-link">
          Features
        </a>

        <a href="#" class="footer-link">
          About
        </a>
      </div>
      <hr class="footer-divider" />
      <p class="footer-copy">&copy; {currentYear} Company, Inc</p>
    </footer>
  );
};

export default Footer;
