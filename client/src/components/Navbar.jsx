import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import { useState, useRef, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const isAdmin = user.role === 'admin';
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <Link to={isAdmin ? '/admin' : '/dashboard'} className="nav-brand">
          <span className="nav-brand-emoji">🍕</span>
          <span className="nav-brand-text">Pizzara</span>
        </Link>

        {/* Center nav links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {isAdmin ? (
            <>
              <li><Link to="/admin" className={isActive('/admin') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
              <li><Link to="/admin/inventory" className={isActive('/admin/inventory') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Inventory</Link></li>
              <li><Link to="/admin/orders" className={isActive('/admin/orders') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Orders</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Menu</Link></li>
              <li><Link to="/build-pizza" className={isActive('/build-pizza') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Build Your Pizza</Link></li>
              <li><Link to="/my-orders" className={isActive('/my-orders') ? 'active' : ''} onClick={() => setMenuOpen(false)}>My Orders</Link></li>
            </>
          )}
        </ul>

        {/* Right side controls */}
        <div className="nav-right">
          {/* Theme toggle */}
          <button className="nav-theme-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Profile dropdown */}
          <div className="nav-profile" ref={dropdownRef}>
            <button className="nav-profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="nav-avatar">{user.name.charAt(0).toUpperCase()}</div>
              <span className="nav-username">{user.name}</span>
              <span className="nav-chevron">{dropdownOpen ? '▲' : '▼'}</span>
            </button>

            {dropdownOpen && (
              <div className="nav-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">{user.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="dropdown-name">{user.name}</div>
                    <div className="dropdown-email">{user.email}</div>
                  </div>
                </div>
                <div className="dropdown-divider" />
                {!isAdmin && (
                  <Link to="/my-orders" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    📦 My Orders
                  </Link>
                )}
                <div className="dropdown-divider" />
                <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;