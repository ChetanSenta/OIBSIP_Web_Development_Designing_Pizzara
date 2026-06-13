import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getBases, getSauces, getCheeses, getVeggies, getMeats } from '../../services/api';
import './Dashboard.css';

// Import preconfigured pizza images
import margheritaImg from '../../assets/margherita.png';
import pepperoniImg from '../../assets/pepperoni.png';
import veggieImg from '../../assets/veggie.png';
import bbqChickenImg from '../../assets/bbq_chicken.png';

const preconfiguredPizzas = [
  {
    name: 'Margherita Classic',
    image: margheritaImg,
    description: 'The simple Italian classic with fresh basil and melted mozzarella.',
    price: 299,
    toppings: ['Thin Crust Base', 'Marinara Sauce', 'Mozzarella Cheese', 'Tomatoes', 'Basil'],
  },
  {
    name: 'Double Pepperoni',
    image: pepperoniImg,
    description: 'Double the crispy pepperoni with rich cheese and smoky sauce.',
    price: 399,
    toppings: ['Thick Crust Base', 'BBQ Sauce', 'Cheddar Cheese', 'Pepperoni', 'Bacon'],
  },
  {
    name: 'Veggie Supreme',
    image: veggieImg,
    description: 'Loaded with a colorful variety of fresh, crisp garden vegetables.',
    price: 349,
    toppings: ['Whole Wheat Base', 'Pesto Sauce', 'Parmesan Cheese', 'Mushrooms', 'Olives', 'Tomatoes', 'Bell Peppers'],
  },
  {
    name: 'BBQ Chicken Delight',
    image: bbqChickenImg,
    description: 'Succulent chunks of chicken tossed in sweet barbecue sauce.',
    price: 429,
    toppings: ['Stuffed Crust Base', 'BBQ Sauce', 'Mozzarella Cheese', 'Chicken', 'Onions', 'Jalapeños'],
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState({ bases: [], sauces: [], cheeses: [], veggies: [], meats: [] });
  const [loading, setLoading] = useState(true);
  const [showOurPizzas, setShowOurPizzas] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [b, s, c, v, m] = await Promise.all([getBases(), getSauces(), getCheeses(), getVeggies(), getMeats()]);
        setItems({ bases: b.data, sauces: s.data, cheeses: c.data, veggies: v.data, meats: m.data });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleOrderPizza = (pizza) => {
    const pizzaData = {
      base: pizza.toppings[0],
      sauce: pizza.toppings[1],
      cheese: pizza.toppings[2],
      veggies: pizza.toppings.slice(3),
    };
    navigate('/checkout', { state: { pizza: pizzaData, totalPrice: pizza.price } });
  };

  const renderSection = (title, icon, data) => (
    <div className="menu-section animate-fade">
      <h2>{icon} {title}</h2>
      <div className="menu-grid">
        {data.map((item) => (
          <div className="menu-card" key={item._id}>
            <div className="menu-card-icon">{item.image}</div>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) return <div className="page container" style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'48px'}}>🍕</div>;

  return (
    <div className="dashboard page container" style={{ paddingTop: '100px' }}>
      <div className="dashboard-hero">
        <h1>Welcome, <span>{user?.name}</span>  !</h1>
        <p>Explore our menu or build your own custom pizza</p>
        <div className="dashboard-cta">
          <Link to="/build-pizza" className="btn btn-primary btn-lg">Build Your Pizza</Link>
          <button 
            className={`btn btn-lg ${showOurPizzas ? 'btn-primary' : 'btn-secondary'}`} 
            onClick={() => setShowOurPizzas(!showOurPizzas)}
          >
            Our Pizzas
          </button>
          <Link to="/my-orders" className="btn btn-secondary btn-lg">My Orders</Link>
        </div>
      </div>

      {showOurPizzas && (
        <div className="our-pizzas-section animate-fade">
          <h2>Featured Pizzas</h2>
          <div className="our-pizzas-grid">
            {preconfiguredPizzas.map((pizza, index) => (
              <div className="our-pizza-card" key={index}>
                <div className="our-pizza-img-container">
                  <img src={pizza.image} alt={pizza.name} className="our-pizza-img" />
                </div>
                <div className="our-pizza-info">
                  <h3>{pizza.name}</h3>
                  <div className="our-pizza-price-section">
                    <span className="our-pizza-price">₹{pizza.price}</span>
                  </div>
                  <p className="our-pizza-desc">{pizza.description}</p>
                  <div className="our-pizza-toppings-title">Toppings & Custom Base/Sauce:</div>
                  <div className="our-pizza-toppings">
                    {pizza.toppings.map((t, idx) => (
                      <span className="topping-tag" key={idx}>{t}</span>
                    ))}
                  </div>
                  <div className="our-pizza-actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleOrderPizza(pizza)}
                    >
                    🛒  Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {renderSection('Pizza Bases', '', items.bases)}
      {renderSection('Sauces', '', items.sauces)}
      {renderSection('Cheeses', '', items.cheeses)}
      {renderSection('Veggies', '', items.veggies)}
      {renderSection('Meats', '', items.meats)}
    </div>
  );
};

export default Dashboard;
