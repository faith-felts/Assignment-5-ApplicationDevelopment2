import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Pages.css';

function ProductDetailsPage({ products, addToCart }) {
  const { productId } = useParams();
  const product = products.find((item) => String(item.id) === productId);
  const [isAdded, setIsAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1200);
  }

  if (!product) {
    return (
      <section className="product-not-found">
        <p className="eyebrow">Not found</p>
        <h1>We couldn't find that product.</h1>
        <Link className="text-link" to="/products">Return to the collection <span aria-hidden="true">→</span></Link>
      </section>
    );
  }

  return (
    <section className="product-detail-page" aria-labelledby="product-detail-heading">
      <Link className="detail-back-link" to="/products">← All products</Link>
      <div className="product-detail-layout">
        <div className="product-detail-image-wrap">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{product.tag}</p>
          <h1 id="product-detail-heading">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-description">{product.description}</p>
          <button
            className={`add-button${isAdded ? ' is-added' : ''}`}
            type="button"
            onClick={handleAddToCart}
          >
            <span aria-live="polite">{isAdded ? 'Added to cart' : 'Add to cart'}</span>
            <span aria-hidden="true">{isAdded ? '✓' : '+'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;