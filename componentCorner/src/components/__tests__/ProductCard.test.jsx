import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ProductCard from '../ProductCard';

const product = {
  id: 1,
  name: 'Halo Desk Light',
  price: 128,
  image: '/halo.jpg',
  description: 'A soft, directional glow for deep work.',
  tag: 'Best seller',
};

describe('ProductCard', () => {
  it('renders product information and an add-to-cart button', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} onAddToCart={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    expect(screen.getByText('$128.00')).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('calls onAddToCart with the product when clicked', () => {
    const onAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard product={product} onAddToCart={onAddToCart} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledWith(product);
    expect(screen.getByRole('button', { name: /added to cart/i })).toBeInTheDocument();
  });
});