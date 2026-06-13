import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/api';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      login(data.token, data.user);
      toast.success('Welcome back! 🍕');
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ── Left branding panel ── */}
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-brand-icon">🍕</span>
          <span className="auth-brand-name">Pizzara</span>
        </div>

        <h1 className="auth-left-heading">
          Custom Pizza,<br />Delivered Fresh.
        </h1>

        <p className="auth-left-sub">
          Build your perfect pizza from scratch, choose from our
          chef's specials, and track your order in real time.
        </p>

        <div className="auth-features">
          <div className="auth-feature-item">
            <div className="auth-feature-icon">🎨</div>
            <div className="auth-feature-text">
              <strong>Build Your Pizza</strong>
              <span>Choose every layer — base, sauce, cheese & toppings.</span>
            </div>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-icon">⚡</div>
            <div className="auth-feature-text">
              <strong>Live Order Tracking</strong>
              <span>Watch your order move from kitchen to doorstep.</span>
            </div>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-icon">🍕</div>
            <div className="auth-feature-text">
              <strong>Chef's Specials</strong>
              <span>Handcrafted recipes ready to order in one click.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-card-title">Login</h2>
          <p className="auth-card-sub">Enter your credentials to access your account.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-forgot">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="auth-links">
            Don't have an account? <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;