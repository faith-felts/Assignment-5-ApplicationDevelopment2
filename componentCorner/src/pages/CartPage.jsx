import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import './Pages.css';

function CartPage({ cart, removeFromCart }) {
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <section className="cart-section" aria-labelledby="cart-heading">
      <div className="cart-content">
        <div className="cart-heading">
          <div>
            <p className="eyebrow">Your selection</p>
            <h1 id="cart-heading">Shopping cart</h1>
          </div>
          <p className="cart-count-label">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
        </div>
        {cart.length === 0 ? (
          <div className="empty-cart-state">
            <p className="empty-cart">Your bag is empty. Add something you love from the collection.</p>
            <Link className="text-link" to="/products">Explore products <span aria-hidden="true">→</span></Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <CartItem key={item.cartItemId} item={item} onRemove={removeFromCart} />
              ))}
            </div>
            <div className="cart-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default CartPage;