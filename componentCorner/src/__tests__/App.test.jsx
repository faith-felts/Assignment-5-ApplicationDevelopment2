import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

const storageKey = 'componentcorner-cart';

vi.mock('../components/Header', async () => {
  const { Link } = await import('react-router-dom');
  return {
    default: ({ cartCount }) => (
      <>
        <span data-testid="cart-count">{cartCount}</span>
        <Link to="/cart">Shopping cart, {cartCount} {cartCount === 1 ? 'item' : 'items'}</Link>
      </>
    ),
  };
});
vi.mock('../components/Footer', () => ({ default: () => null }));
vi.mock('../pages/HomePage', async () => {
  const { Link } = await import('react-router-dom');
  return { default: () => <Link to="/products">Home page</Link> };
});
vi.mock('../pages/ProductsPage', () => ({
  default: ({ products, addToCart }) => (
    <button type="button" onClick={() => addToCart(products[0])}>Add test product</button>
  ),
}));
vi.mock('../pages/ProductDetailsPage', () => ({ default: () => null }));
vi.mock('../pages/CartPage', () => ({
  default: ({ cart, removeFromCart }) => (
    <div>
      <span data-testid="cart-contents">{cart.map((item) => item.name).join(', ')}</span>
      {cart.map((item) => (
        <button key={item.cartItemId} type="button" onClick={() => removeFromCart(item.cartItemId)}>
          Remove {item.name}
        </button>
      ))}
    </div>
  ),
}));

describe('App cart state', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders and initializes an empty cart from localStorage', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    render(<App />);

    expect(screen.getByText('Home page')).toBeInTheDocument();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(getItem).toHaveBeenCalledWith(storageKey);
    expect(setItem).toHaveBeenCalledWith(storageKey, '[]');
  });

  it('loads saved cart data on startup', () => {
    const savedCart = [{ cartItemId: 'saved-1', name: 'Saved Desk Light', price: 128 }];
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(savedCart));
    window.history.replaceState({}, '', '/cart');

    render(<App />);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-contents')).toHaveTextContent('Saved Desk Light');
  });

  it('persists cart additions and removals', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue('cart-1');

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Home page' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add test product' }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(setItem).toHaveBeenLastCalledWith(
      storageKey,
      expect.stringContaining('Halo Desk Light'),
    );

    fireEvent.click(screen.getByRole('link', { name: 'Shopping cart, 1 item' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove Halo Desk Light' }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(setItem).toHaveBeenLastCalledWith(storageKey, '[]');
  });

  it('ignores malformed items in stored cart data', () => {
    const savedCart = [
      { cartItemId: 'valid-1', name: 'Valid Desk Light', price: 128 },
      { broken: true },
      'not-an-object',
    ];
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(savedCart));

    render(<App />);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.queryByText('Valid Desk Light')).not.toBeInTheDocument();
  });

  it('does not throw when localStorage write fails', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

    expect(() => render(<App />)).not.toThrow();
    expect(() => fireEvent.click(screen.getByRole('link', { name: 'Home page' }))).not.toThrow();
  });
});