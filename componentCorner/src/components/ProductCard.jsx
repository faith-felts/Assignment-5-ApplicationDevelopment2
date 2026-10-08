import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const { name, price, image, description, tag } = product;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  function handleWishlistToggle() {
    setIsWishlisted((currentValue) => !currentValue);
  }

  function handleAddToCart() {
    onAddToCart(product);
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1200);
  }

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/products/${product.id}`} aria-label={`View ${name}`}>
          <img className="product-image" src={image} alt={name} />
        </Link>
        <span className="product-tag">{tag}</span>
        <button
          className={`wishlist-button${isWishlisted ? ' is-wishlisted' : ''}`}
          type="button"
          aria-label={isWishlisted ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          aria-pressed={isWishlisted}
          onClick={handleWishlistToggle}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-details">
        <div className="product-title-row">
          <h3><Link className="product-detail-link" to={`/products/${product.id}`}>{name}</Link></h3>
          <p className="product-price">${price.toFixed(2)}</p>
        </div>
        <p className="product-description">{description}</p>
        <button
          className={`add-button${isAdded ? ' is-added' : ''}`}
          type="button"
          onClick={handleAddToCart}
        >
          <span aria-live="polite">{isAdded ? 'Added to cart' : 'Add to cart'}</span>
          <span aria-hidden="true">{isAdded ? '✓' : '+'}</span>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;