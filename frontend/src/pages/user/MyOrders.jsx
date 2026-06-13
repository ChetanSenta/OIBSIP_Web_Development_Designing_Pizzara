import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../../services/api';
import './MyOrders.css';

const statusSteps = ['Order Placed', 'Order Received', 'In the Kitchen', 'Sent to Delivery', 'Delivered'];
const statusIcons  = ['📦', '✅', '👨‍🍳', '🚗', '🏠'];

const getStatusBadgeClass = (status) => {
  const map = {
    'Order Placed':     'badge-placed',
    'Order Received':   'badge-received',
    'In the Kitchen':   'badge-kitchen',
    'Sent to Delivery': 'badge-delivery',
    'Delivered':        'badge-delivered',
  };
  return map[status] || 'badge-placed';
};

const getCardClass = (status) => {
  const map = {
    'Order Placed':     'placed',
    'Order Received':   'received',
    'In the Kitchen':   'kitchen',
    'Sent to Delivery': 'delivery',
    'Delivered':        'delivered',
  };
  return map[status] || '';
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await getMyOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="page container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '48px' }}>
        🍕
      </div>
    );
  }

  return (
    <div className="my-orders page container" style={{ paddingTop: '100px' }}>
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>🍕</p>
          <h3>No orders yet</h3>
          <Link to="/build-pizza" className="btn btn-primary" style={{ marginTop: 16 }}>
            Build Your First Pizza
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const currentIdx = statusSteps.indexOf(order.status);
            return (
              <div className={`order-card ${getCardClass(order.status)}`} key={order._id}>

                {/* Header */}
                <div className="order-header">
                  <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                  <span className={`badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Pizza details */}
                <div className="order-details">
                  <div className="order-detail-item">
                    <span className="order-detail-label">Base</span>
                    <span className="order-detail-value">{order.pizza.base}</span>
                  </div>
                  <div className="order-detail-item">
                    <span className="order-detail-label">Sauce</span>
                    <span className="order-detail-value">{order.pizza.sauce}</span>
                  </div>
                  <div className="order-detail-item">
                    <span className="order-detail-label">Cheese</span>
                    <span className="order-detail-value">{order.pizza.cheese}</span>
                  </div>
                  <div className="order-detail-item">
                    <span className="order-detail-label">Toppings</span>
                    <span className="order-detail-value">
                      {order.pizza.veggies?.length > 0 ? order.pizza.veggies.join(', ') : 'None'}
                    </span>
                  </div>
                </div>

                {/* Stepper */}
                <div className="status-timeline">
                  {statusSteps.map((step, i) => (
                    <div className="status-step-wrap" key={step}>
                      <div
                        className={`status-dot ${i < currentIdx ? 'done' : ''} ${i === currentIdx ? 'current' : ''}`}
                        title={step}
                      >
                        {statusIcons[i]}
                      </div>
                      {i < statusSteps.length - 1 && (
                        <div className={`status-line ${i < currentIdx ? 'done' : ''}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="order-footer">
                  <span className="order-price">₹{order.totalPrice}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;