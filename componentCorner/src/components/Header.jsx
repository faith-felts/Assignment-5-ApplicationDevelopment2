import './Header.css';
import { NavLink, Link } from 'react-router-dom';

function Header({ storeName, cartCount }) {
  return (
    <header className="site-header">
      <Link className="wordmark" to="/" aria-label={`${storeName} home`}>
        <span className="wordmark-mark">CC</span>
        <span>{storeName}</span>
      </Link>
      <nav className="nav-menu" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>Products</NavLink>
      </nav>
      <Link className="header-action cart-link" to="/cart" aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}>
        <svg className="cart-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 4h2l2.1 10a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 1.9-1.4L21 8H6" />
          <circle cx="10" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
        <span className="cart-badge" aria-hidden="true">{cartCount}</span>
      </Link>
    </header>
  );
}

export default Header;
