import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';

const products = [
  {
    id: 1,
    name: 'Halo Desk Light',
    price: 128,
    image: 'https://placehold.co/600x400/e7d8c5/2e2924?text=Halo+Desk+Light',
    description: 'A soft, directional glow for deep work and late-night ideas.',
    tag: 'Best seller',
  },
  {
    id: 2,
    name: 'Fold Wireless Stand',
    price: 74,
    image: 'https://placehold.co/600x400/cad8d1/2e2924?text=Fold+Wireless+Stand',
    description: 'A compact charging dock that keeps your desk beautifully clear.',
    tag: 'New',
  },
  {
    id: 3,
    name: 'Field Notes Speaker',
    price: 196,
    image: 'https://placehold.co/600x400/d6cbdc/2e2924?text=Field+Notes+Speaker',
    description: 'Room-filling sound in a small, tactile form made for slow mornings.',
    tag: 'Staff pick',
  },
  {
    id: 4,
    name: 'North Loop Chair',
    price: 218,
    image: 'https://placehold.co/600x400/f0d9b5/2e2924?text=North+Loop+Chair',
    description: 'A supportive sit with warmth, texture, and just enough sculptural form.',
    tag: 'Popular',
  },
  {
    id: 5,
    name: 'Canvas Cable Tray',
    price: 56,
    image: 'https://placehold.co/600x400/c9d9d0/2e2924?text=Canvas+Cable+Tray',
    description: 'Keeps charging cords tidy without sacrificing the clean look of your desk.',
    tag: 'Editor’s pick',
  },
  {
    id: 6,
    name: 'Mira Notebook Set',
    price: 32,
    image: 'https://placehold.co/600x400/e4d8ea/2e2924?text=Mira+Notebook+Set',
    description: 'Lined journals for capturing ideas, plans, and the little details worth keeping.',
    tag: 'Fresh drop',
  },
];

function readSavedCart() {
  try {
    const savedCart = window.localStorage.getItem('componentcorner-cart');
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

function App() {
  const [cart, setCart] = useState(readSavedCart);

  useEffect(() => {
    window.localStorage.setItem('componentcorner-cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    const cartItem = { ...product, cartItemId: crypto.randomUUID() };
    setCart((currentCart) => [...currentCart, cartItem]);
  }

  function removeFromCart(cartItemId) {
    setCart((currentCart) => currentCart.filter((item) => item.cartItemId !== cartItemId));
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header storeName="ComponentCorner" cartCount={cart.length} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage products={products} addToCart={addToCart} />} />
            <Route path="/products/:productId" element={<ProductDetailsPage products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer
          storeName="ComponentCorner"
          description="Thoughtful technology for the way you work, rest, and make things."
          contact="hello@componentcorner.com"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;