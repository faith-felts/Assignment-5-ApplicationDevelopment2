import ProductCard from '../components/ProductCard';
import './Pages.css';

function ProductsPage({ products, addToCart }) {
  return (
    <section className="products-section" aria-labelledby="products-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The edit</p>
          <h1 id="products-heading">Objects with a point of view</h1>
        </div>
        <p className="section-note">{String(products.length).padStart(2, '0')} considered finds</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;