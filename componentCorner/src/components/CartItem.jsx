import './CartItem.css';

function CartItem({ item, onRemove }) {
  return (
    <article className="cart-item">
      <div>
        <h3>{item.name}</h3>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <button type="button" onClick={() => onRemove(item.cartItemId)} aria-label={`Remove ${item.name} from cart`}>
        Remove
      </button>
    </article>
  );
}

export default CartItem;