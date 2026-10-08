import './Footer.css';
import { Link } from 'react-router-dom';

function Footer({ storeName, description, contact }) {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-intro" id="story">
        <p className="eyebrow">Stay curious</p>
        <h2>Good things for your corner of the world.</h2>
      </div>
      <div className="footer-details">
        <div className="footer-brand">
          <p className="footer-wordmark">{storeName}</p>
          <p>{description}</p>
        </div>
        <div className="footer-column">
          <p className="footer-label">Navigate</p>
          <Link to="/">Home</Link>
          <Link to="/products">Collection</Link>
          <Link to="/cart">Shopping cart</Link>
        </div>
        <div className="footer-column">
          <p className="footer-label">Say hello</p>
          <a href={`mailto:${contact}`}>{contact}</a>
          <p>Brooklyn, NY</p>
          <p>Mon–Fri, 9–5 EST</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 {storeName}</span>
        <span>Made for the everyday</span>
      </div>
    </footer>
  );
}

export default Footer;