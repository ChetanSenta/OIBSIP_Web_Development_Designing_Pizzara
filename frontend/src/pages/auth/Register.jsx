import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../services/api';
import { toast } from 'react-toastify';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { data } = await registerUser({ name: form.name, email: form.email, password: form.password });
      if (data.token) {
        login(data.token, data.user);
        toast.success('Account created! 🍕');
        navigate('/dashboard');
      } else {
        toast.success('Account created! Please verify your email.');
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
          Join Pizzara<br />Today.
        </h1>

        <p className="auth-left-sub">
          Create your account and start building your dream pizza.
          Fresh ingredients, endless combinations, fast delivery.
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
          <h2 className="auth-card-title">Create Account</h2>
          <p className="auth-card-sub">Sign up to start ordering your perfect pizza.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Chetan Senta"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="name@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full"
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <div className="auth-links">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;